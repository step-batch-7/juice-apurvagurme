const assert = require("assert");
const lib2 = require("../src/queryOptLib");
const {
  employeeRecords,
  getSumOfQty,
  countQty,
  getEmployeeRecord,
  isOldEmployee
} = lib2;

describe("getSumOfQty", function() {
  it("should give sum of quantity with the given argument", function() {
    assert.strictEqual(getSumOfQty(1, ["11111", "Watermelon", "1"]), 2);
  });
});

describe("countQty", function() {
  it("should give a sum of quantities of juices", function() {
    let argument = [
      ["--query", "--empId", "2"],
      ["--query", "--empId", "1"]
    ];
    assert.deepStrictEqual(countQty(argument), 3);
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
    assert.deepStrictEqual(getEmployeeRecord("11111"), [
      ["11111", "Orange", "2", "2019-11-20T05:50:28.267Z"],
      ["11111", "Watermelon", "1", "2019-11-20T05:50:28.267Z"]
    ]);
  });
});

describe("employeeRecords", function() {
  it("should give values of the given object consist of empRecords", function() {
    let date = "2019-11-23T05:30:32.055Z";
    let argument = { "--beverage": "Orange", "--qty": "1", time: date };
    assert.deepStrictEqual(employeeRecords(argument), ["Orange", "1", date]);
  });
});
