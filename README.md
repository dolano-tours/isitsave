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
- Unit-Tested

## Installation
### NPM
```bash
npm install isitsave
```
### Yarn
> Coming Soon

## Example
```typescript
import { createPrimitiveSigner } from "isitsave"

const signer = createPrimitiveSigner("secret_key");
signer
  .dump({ example: "data", like: [ "an array" ], or: 3 })
  .then(async signedData => {
    console.log(signedData);

    const loaded = await signer.load(signedData);
    console.log(loaded)
  })
```