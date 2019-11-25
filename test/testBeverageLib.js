const assert = require("assert");
const lib1 = require("../src/beverageLib");
const { getString, getTransactionRecord, convertArrayToObj } = lib1;

describe("convertArrayToObj", function() {
  it("should give an object of given array", function() {
    let expectedValue = { action: "--query", "--empId": "11111" };
    assert.deepStrictEqual(
      convertArrayToObj(["--query", "--empId", "11111"]),
      expectedValue
    );
  });
  it("should give an object of given array", function() {
    let expectedValue = { action: "--query", "--empId": "11111" };
    assert.deepStrictEqual(
      convertArrayToObj(["--query", "--empId", "11111"]),
      expectedValue
    );
  });
});

describe("getString", function() {
  it("should give a joined string when an array of string is given", function() {
    let expectedValue = "a,b,c\nd,e";
    let actual = getString(
      [
        ["a", "b", "c"],
        ["d", "e"]
      ],
      2
    );
    assert.deepStrictEqual(actual, expectedValue);
  });
});

describe("getTransactionRecord", function() {
  it("should give employee records when give task is query", function() {
    let expectedValue = [
      ["Employee ID", " Beverage", " Quantity", " Date"],
      ["12345", "Watermelon", "1", "2019-11-20T05:29:47.793Z"],
      ["Total: 1 Juices"]
    ];
    let argument = { action: "--query", "--empId": "12345" };
    assert.deepStrictEqual(getTransactionRecord(argument), [expectedValue]);
  });
});
