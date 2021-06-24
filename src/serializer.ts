export interface ISerializer<data_DataType> {
  data: data_DataType;
  update(newData: data_DataType): Promise<void>;
  serialize(): Promise<string>;
  deserialize(serialized_data: string): Promise<data_DataType>;
}

export type TPrimitiveSerializerDataType = string | number | boolean | symbol | Record<string | number | symbol, unknown>;


export class PrimitiveSerializer implements ISerializer<TPrimitiveSerializerDataType> {
  data!: TPrimitiveSerializerDataType;
  savedDataype!: string;
  
  async update(newData: TPrimitiveSerializerDataType): Promise<void> {
    this.data = newData;
  }

  async serialize(): Promise<string> {
    let dt!: string;

    if(this.savedDataype == undefined || this.savedDataype == null) {
      this.savedDataype = typeof this.data
    }
    // FIXME: Fix This mumbo jumbo
    if(["string", "number", "boolean", "symbol"].includes(typeof this.data)) {
      dt = (this.data as string | number | boolean | symbol).toString();
    } else if (typeof this.data == "object") {
      // NOTE: 😂
      try {
        dt = JSON.stringify(this.data);
      } catch (error1) {
        console.warn("[Signer]", "Failed to stringified object, retrying...");
        console.error("[Signer]", error1);
        try {
          dt = this.data.toString();
        } catch (error2) {
          console.warn("[Signer]", "Failed to cast object to String, retrying...");
          console.warn("[Signer]", "Warning: Data Returned from this stage is not accurade. please use with caution");
          console.error("[Signer]", error2);
          dt = `${this.data}`;
        }
      }
    }

    return dt;
  }

  async deserialize(serialized_data: string): Promise<TPrimitiveSerializerDataType> {
    switch(this.savedDataype) {
      case "string":
      case "symbol":
        return String(serialized_data)
      case "number":
        return Number(serialized_data)
      case "boolean":
        return Boolean(serialized_data)
      case "object":
        return JSON.parse(serialized_data) as Record<string | number | symbol, unknown>
      default:
        throw new Error("unsupported_data_type");
    }
  }
}