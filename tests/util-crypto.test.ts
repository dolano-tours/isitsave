// All Test Cases expectation value gathered from sha256sum
describe("Testing Hash Function", () => {
  const testCases = [
    {
      data: "abc",
      algo: "sha256",
      dgst: "hex",
      expect: "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
    }
  ];

  for(const testCase of testCases) {
    test(`Case ${testCase.data}`, () => expect(
        crypto.hash(
          testCase.data,
          testCase.algo,
          testCase.dgst as _crypto.BinaryToTextEncoding
        )
      )
      .resolves
      .toStrictEqual(testCase.expect)
    );
  }
})

describe("Testing Sign Function", () => {
  const testCases = [
    {
      data: "abc",
      skey: "wowotek",
      algo: "sha256",
      dgst: "hex",
      expect: "b9f707f288436f778f413c9618429b0dbd9f24bba155e0add52c7acdac880eda"
    }
  ];

  for(const testCase of testCases) {
    test(`Case ${testCase.data}`, () => expect(
        crypto.hmacSign(
          testCase.data,
          testCase.skey,
          testCase.algo,
          testCase.dgst as _crypto.BinaryToTextEncoding
        )
      )
      .resolves
      .toStrictEqual(testCase.expect)
    )
  }
})