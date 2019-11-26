const assert = require("assert");
const saveOptFunc = require("../src/saveOptLib");
const { getSaveArray, saveEmpRecord } = saveOptFunc;

describe("getSaveArray", function() {
  it("get array of transaction records that is recorded", function() {
    let actual = getSaveArray(["11111", "Orange", "1", "date"]);
    let expected = [
      ["Transaction Recorded:"],
      ["Employee ID", " " + "Beverage", " " + "Quantity", " " + "Date"],
      ["11111", "Orange", "1", "date"]
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("saveEmpRecord", function() {
  it("should write or save the new transaction details to the file", function() {
    let date = "2019-11-20T05:29:47.793Z";
    let fileContents = "{}";
    let cmdLineArgsObj = {
      action: "--save",
      "--empId": "11111",
      "--beverage": "Watermelon",
      "--qty": "1"
    };
    let actual = saveEmpRecord(cmdLineArgsObj, date, fileContents);
    let expected = {
      "--empId": "11111",
      "--beverage": "Watermelon",
      "--qty": "1",
      date: "2019-11-20T05:29:47.793Z"
    };
    assert.deepStrictEqual(actual, expected);
  });
});
