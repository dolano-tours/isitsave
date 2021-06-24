// @ts-ignore
import zlib from "zlib";
import { ISerializer, PrimitiveSerializer, TPrimitiveSerializerDataType } from "./serializer";
import utilCrypto from "./util-crypto";

export class Signer<T> {
  private _secretKey: string;
  private _serializer: ISerializer<T>;

  private _isDumped: boolean;

  public constructor(secretKey: string, serializer: ISerializer<T>) {
    this._serializer = serializer;
    this._secretKey = secretKey

    this._isDumped = false;
  }

  public async dump(data: T): Promise<string> {
    if(this._isDumped) {
      const e = new Error("Signed data has been dumped,");
      throw e
    }

    // Serialize
    return await this._serializer
      .update(data)
      .then(async () => this._serializer.serialize())
      .then(async serialized => utilCrypto
          .hmacSign(
            serialized,
            this._secretKey
          )
          .then(async signature => {
            const encodedData = Buffer
                .from(serialized)
                .toString("base64");
            
            const signatureAppended = `${encodedData}.${signature}`;
            return await utilCrypto
              .hash(signatureAppended)
              .then(async hashed => `${signatureAppended}.${hashed}`)
              .then(async hashAppended => {
                const encodedLength = hashAppended.length;
                return `${encodedLength}.${hashAppended}`
              })
              .then(async lengthAppended => {
                // return lengthAppended;
                // return Buffer.from(lengthAppended).toString("base64");
                return zlib.deflateRawSync(Buffer.from(lengthAppended)).toString("base64");
              })
          })
      )
  }

  public async load(data: string): Promise<T> {
    // check if data is fully encoded
    const decodedData = zlib.inflateRawSync(Buffer.from(data, "base64")).toString("utf-8");
    const splitted: Array<string> = decodedData.split(".");
    if(splitted.length != 4) {
      const e = new Error("invalid iis data");
      throw e
    }
    const dataLength = Number(splitted[0]);
    const encodedData = splitted[1];
    const signature = splitted[2];
    const hash = splitted[3]

    // Check if data length is correct;
    const complete = `${encodedData}.${signature}.${hash}`;
    if(complete.length != dataLength) {
      const e = new Error("Invalid Data Length");
      throw e
    }
    
    // check if encoded data has been tempered
    const signatureAppended = `${encodedData}.${signature}`;
    const newHash = await utilCrypto.hash(signatureAppended);
    const isTempered = newHash != hash;
    if(isTempered) {
      const e = new Error("Data Is Tempered! Hash Value Doesn't Match!")
      throw e;
    }

    const realData = Buffer.from(encodedData as string, "base64").toString("utf-8");
    const resigning = await this._serializer
      .update(realData as unknown as T)
      .then(async () => this._serializer.serialize())
      .then(async serialized => utilCrypto
          .hmacSign(
            serialized,
            this._secretKey
          )
      )
    const isMatchingSignature = resigning == signature;
    if(!isMatchingSignature) {
      const e = new Error("Signature Doesn't Match!")
      throw e
    }

    return await this._serializer.deserialize(realData);
  }
}

export function createPrimitiveSigner(secretKey: string): Signer<TPrimitiveSerializerDataType> {
  const signer = new Signer(secretKey, new PrimitiveSerializer());
  return signer;
}

export default createPrimitiveSigner;