const assert = require("assert");
const lib2 = require("../src/queryOptLib");
const { countQty, getEmployeeRecord, isOldEmployee, getQueryArray } = lib2;

describe("countQty", function() {
  it("should give a sum of quantities of juices", function() {
    let argument = { "--qty": "3" };
    assert.deepStrictEqual(countQty(0, argument), 3);
  });
});

describe("isOldEmployee", function() {
  it("should validate empId is present or not", function() {
    let argument = {
      "11111": [
        {
          "--beverage": "orange",
          "--qty": "1",
          time: "2019-11-23T05:30:32.055Z"
        }
      ],
      "12345": []
    };
    assert.deepStrictEqual(isOldEmployee("11111", argument), true);
  });
});

describe("getEmployeeRecord", function() {
  it("should give employee records when empId is given", function() {
    let fileContents =
      '{"12345":[{"empId":"12345","--beverage":"Watermelon","--qty":"1","time":"2019-11-20T05:29:47.793Z"}]}';

    let actual = getEmployeeRecord("12345", fileContents);
    let expected = [
      {
        "--beverage": "Watermelon",
        "--qty": "1",
        empId: "12345",
        time: "2019-11-20T05:29:47.793Z"
      }
    ];

    assert.deepStrictEqual(actual, expected);
  });
  it("should give empty array if empId is not present in previous record", function() {});
  let fileContents = "{}";
  let actual = getEmployeeRecord("12345", fileContents);
  let expected = [];
  assert.deepStrictEqual(actual, expected);
});

describe("getQueryArray", function() {
  it("should give the older transaction history of the given employee", function() {
    let actual = getQueryArray(
      [["11111", "Orange", "3", "2019-11-20T05:29:47.793Z"]],
      3
    );
    let expected = [
      ["Employee ID", " " + "Beverage", " " + "Quantity", " " + "Date"],
      ["11111", "Orange", "3", "2019-11-20T05:29:47.793Z"],
      ["Total:" + " " + 3 + " " + "Juices"]
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
