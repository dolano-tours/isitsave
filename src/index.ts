import { createPrimitiveSigner } from "./signer"

// const originalData = { example: "data", like: [ "an array" ], or: 3 };
// console.log("Original Data:", originalData);
// const signer = createPrimitiveSigner("secret_key");
// signer
//   .dump(originalData)
//   .then(async signedData => {
//     console.log("Signed:", signedData);

//     const loaded = await signer.load(signedData);
//     console.log("Loaded:", loaded)
//   });

const originalData = { example: "data", like: [ "an array" ], or: 3 };
console.log("Original Data:", originalData);
const signer = createPrimitiveSigner("secret_key");
signer
  .dump(originalData)
  .then(async signedData => {
    const signedDataTempered = `${signedData}`
    console.log("Signed:", signedDataTempered);

    const loaded = await signer.load(signedDataTempered);
    console.log("Loaded:", loaded)
  });