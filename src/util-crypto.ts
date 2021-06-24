import crypto from "crypto";
import stream from "stream";


async function hash(
  data: crypto.BinaryLike,
  algorithm: string = "sha512",
  digestEncoding: crypto.BinaryToTextEncoding = "base64",
  options?: crypto.HashOptions
): Promise<string> {
  let hasher: crypto.Hash;
  
  if(options == undefined) {
    hasher = crypto.createHash(algorithm)
  } else {
    hasher = crypto.createHash(algorithm, options);
  }

  hasher.update(data)
  return hasher.digest(digestEncoding);
}

async function hmacSign(
  data: crypto.BinaryLike,
  secret_key: crypto.BinaryLike,
  algorithm: string = "sha512",
  digestEncoding: crypto.BinaryToTextEncoding = "base64",
  options?: stream.TransformOptions
): Promise<string> {
  let signer: crypto.Hmac;
  
  if(options == undefined) {
    signer = crypto.createHmac(algorithm, secret_key);
  } else {
    signer = crypto.createHmac(algorithm, secret_key, options)
  }

  signer.update(data);
  return signer.digest(digestEncoding);
}

export default {
  hash,
  hmacSign
}