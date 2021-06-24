import { PrimitiveSerializer } from "../src/serializer";

describe("Testing Built-In PrimitiveSerializer", () => {
  const testCases = [
    {
      dataType: String,
      data: "some data",
      expect: "some data",
    },
    {
      dataType: String,
      data: "sOmE 0tHeR d4t@",
      expect: "sOmE 0tHeR d4t@"
    },
    {
      dataType: Number,
      data: 1,
      expect: "1"
    },
    {
      dataType: Number,
      data: 9007199254740991,
      expect: "9007199254740991"
    },
    {
      dataType: Number,
      data: -9007199254740991,
      expect: "-9007199254740991"
    },
    {
      dataType: Number,
      data: 0xdeadbeef,
      expect: "3735928559"
    },
    {
      dataType: Number,
      data: 0b101010101,
      expect: "341"
    },
    {
      dataType: Number,
      data: 0.987123,
      expect: "0.987123"
    },
    {
      dataType: Number,
      data: .123789,
      expect: "0.123789"
    },
    {
      dataType: Boolean,
      data: true,
      expect: "true"
    },
    {
      dataType: Boolean,
      data: Boolean(1),
      expect: "true"
    },
    {
      dataType: Boolean,
      data: Boolean(-1),
      expect: "true"
    },
    {
      dataType: Boolean,
      data: false,
      expect: "false"
    },
    {
      dataType: Boolean,
      data: Boolean(0),
      expect: "false"
    },
    {
      dataType: Boolean,
      data: Boolean(""),
      expect: "false"
    },
    {
      dataType: Boolean,
      data: Boolean("a"),
      expect: "true"
    },
    {
      dataType: Boolean,
      data: Boolean({ foo: "bar" }),
      expect: "true"
    },
    {
      dataType: Boolean,
      data: Boolean({ foo: "bar" }),
      expect: "true"
    },
    {
      dataType: Object,
      data: { foo: "bar" },
      expect: '{"foo":"bar"}'
    },
    {
      dataType: Object,
      data: {
        foo: "bar",
        bar: {
          foo: {
            bar: {
              foo: {
                bar: {
                  foo: "bar",
                  bar: "foo"
                }
              }
            }
          }
        }
      },
      expect: '{"foo":"bar","bar":{"foo":{"bar":{"foo":{"bar":{"foo":"bar","bar":"foo"}}}}}}'
    },
    {
      dataType: Object,
      data: {
        foo: "bar",
        bar: {
          foo: {
            bar: {
              foo: {
                bar: {
                  foo: "bar",
                  bar: "foo",
                  foos: ["bar", "rab", 3],
                  bars: ["ofo", "oof", true],
                  ne: ["foo", 0.1, { foo: "bar"} ]
                }
              }
            }
          },
          bar: [
            "foo", { foo: "foo" }
          ]
        }
      },
      expect: '{"foo":"bar","bar":{"foo":{"bar":{"foo":{"bar":{"foo":"bar","bar":"foo","foos":["bar","rab",3],"bars":["ofo","oof",true],"ne":["foo",0.1,{"foo":"bar"}]}}}},"bar":["foo",{"foo":"foo"}]}}'
    },
    // {
    //   dataType: Array,
    //   data: [ "foo", "bar" ],
    //   expect: "{\"foo\":\"bar\"}"
    // },
    // {
    //   dataType: Object,
    //   data: [ 1, 2 ],
    //   expect: "{\"foo\":\"bar\"}"
    // }
  ]

  let serializer: PrimitiveSerializer;

  beforeEach(() => {
    serializer = new PrimitiveSerializer()
  })
  for(const testCase of testCases) {
    it(`Should Serialized [${testCase.data}] as ${testCase.dataType.name.toLowerCase()} to "${testCase.expect}"`, () => {
      return serializer
        .update(testCase.data)
        .then(async () => await serializer.serialize())
        .then(async serialized => {
          expect(serialized).toBe(testCase.expect)
        })
    });
  }
})