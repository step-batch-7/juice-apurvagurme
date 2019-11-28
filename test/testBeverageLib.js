const assert = require("assert");
const lib1 = require("../src/beverageLib");
const {
  getString,
  getTransactionRecord,
  convertArrayToObj,
  getListOfDetails
} = lib1;

describe("convertArrayToObj", function() {
  it("should give an object when given action is query", function() {
    let expectedValue = { action: "--query", "--empId": "11111" };
    assert.deepStrictEqual(
      convertArrayToObj(["--query", "--empId", "11111"]),
      expectedValue
    );
  });
  it("should give an object when given action is save", function() {
    let expectedValue = { action: "--save", "--empId": "11111" };
    assert.deepStrictEqual(
      convertArrayToObj(["--save", "--empId", "11111"]),
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
    const saveRecord = function(path) {
      if (path == "somePath") {
        return true;
      }
    };
    let expectedValue = [
      ["Employee ID", " Beverage", " Quantity", " Date"],
      ["12345", "Watermelon", "1", "2019-11-20T05:29:47.793Z"],
      ["Total: 1 Juices"]
    ];
    let argument = { action: "--query", "--empId": "12345" };
    let date = "2019-11-20T05:29:47.793Z";
    let fileContents =
      '{"12345":[{"--empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]}';
    let actual = getTransactionRecord(
      argument,
      date,
      fileContents,
      saveRecord,
      "somePath"
    );
    assert.deepStrictEqual(actual, expectedValue);
  });
  it("should give last transaction details", function() {
    const saveRecord = function(path) {
      if (path == "somePath") {
        return true;
      }
    };
    let expectedValue = [
      ["Transaction Recorded:"],
      ["Employee ID", " Beverage", " Quantity", " Date"],
      ["12345", "Watermelon", "1", "2019-11-20T05:29:47.793Z"]
    ];
    let argument = {
      action: "--save",
      "--beverage": "Watermelon",
      "--empId": "12345",
      "--qty": "1"
    };
    let date = "2019-11-20T05:29:47.793Z";
    let fileContents =
      '{"12345":[{"empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]}';

    let actual = getTransactionRecord(
      argument,
      date,
      fileContents,
      saveRecord,
      "somePath"
    );
    assert.deepStrictEqual(actual, expectedValue);
  });
});

describe("getListOfDetails", function() {
  it("should give all the transaction details without ", function() {
    let expected = ["12345", "Orange", "1", "2019-11-20T05:29:47.793Z"];
    let actual = getListOfDetails({
      "--empId": "12345",
      "--beverage": "Orange",
      "--qty": "1",
      "--date": "2019-11-20T05:29:47.793Z"
    });
    assert.deepStrictEqual(actual, expected);
  });
});
