<div align="center">
<h1>Is It Save ?</h1>
<p><i><sub>Is it tho ?</i></sub></p>
<br/>
</div>



## Description
Inspired by [Palletes Project's **'ItsDangerous'**](https://itsdangerous.palletsprojects.com), to cryptographically sign your data to be savely transported over and back ensuring it's content secure, intact, and untampered. implemented for _Node_ and adjusted for ease of use with JSON structure and Asynchronous Programming

## Features
- JSON Friendly
- Fully Asynchronous
- Customizeable Serializer
- Came with Built-int Primitive Data Type Serializer
- Typed, come with typescript declaration
- Unit-Tested

## Installation
### NPM
```bash
npm install isitsave
```
#### Typescript
For Typescript user, this module came with it's own declaration stub file, you don't need to install `@types/isitsave`

## Example
### Basic
```typescript
import { createPrimitiveSigner } from "isitsave"

const originalData = { example: "data", like: [ "an array" ], or: 3 };
console.log("Original Data:", originalData);
const signer = createPrimitiveSigner("secret_key");
signer
  .dump(originalData)
  .then(async signedData => {
    console.log("Signed:", signedData);

    const loaded = await signer.load(signedData);
    console.log("Loaded:", loaded)
  });
```

```text
Original Data: { example: 'data', like: [ 'an array' ], or: 3 }
Signed: ZXlKbGVHRnRjR3hsSWpvaVpHRjBZU0lzSW14cGEyVWlPbHNpWVc0Z1lYSnlZWGtpWFN3aWIzSWlPak45LjZITUEwdzlPdERZSHdlRmIwVFBvVmhObzZZeUx1Ykd6RjNLRDhYNGNmRXBoOWZ2TEgxSG41ZWdnTDFIaUZoUlBlNVpQOHBmQUw3UUlqK2tlU3g5QjRnPT0uQVYwTjgvZUR4elpJa1RZbWlvTHZQRFJuVHB0ejlENnE3ZnRJK1NYbkJPOW1vdktDdHE2YUoxb284T1FPRHQvSGJqSXRGMWl2L2tuZ0F3WGFVM0t0WFE9PQ==
Loaded: { example: 'data', like: [ 'an array' ], or: 3 }
```