const getProcess = require("../src/genericUtils.js").getProcess;
const assert = require("assert");

describe("getProcess", function() {
  it("should give function Reference of the process to perform when action is query", function() {
    let action = "--query";
    let object = { "--query": "processQuery", "--save": "processSave" };
    let actual = getProcess(object, action);
    let expected = "processQuery";
    assert.deepStrictEqual(actual, expected);
  });
  it("should give function Reference of the process to perform when action is save", function() {
    let action = "--save";
    let object = { "--query": "processQuery", "--save": "processSave" };
    let actual = getProcess(object, action);
    let expected = "processSave";
    assert.deepStrictEqual(actual, expected);
  });
  it("should give empty array when action is not valid", function() {
    let action = "--beverage";
    let object = { "--query": "processQuery", "--save": "processSave" };
    let actual = getProcess(object, action);
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});
