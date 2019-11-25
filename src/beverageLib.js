const fs = require("fs");
let contents = fs.readFileSync("./records.json", "utf8");
const queryLib = require("./queryOptLib");
const { getEmployeeRecord, getQueryArray, countQty } = queryLib;

const convertArrayToObj = function(cmdLineArgs) {
  let object = {};
  let args = cmdLineArgs;
  args = args.slice(1);
  for (let index = 0; index < args.length; index = index + 2) {
    object[args[index]] = args[index + 1];
  }
  if (cmdLineArgs.includes("--save")) {
    object["action"] = "--save";
  }
  if (cmdLineArgs.includes("--query")) {
    object["action"] = "--query";
  }
  return object;
};

const getString = function(recordOfTransaction) {
  let records = recordOfTransaction;
  return records.join("\n");
};

const getTransactionRecord = function(cmdLineArgsObj) {
  let recordsOfEmp = [];
  let totalQty = 0;
  if (cmdLineArgsObj["action"] == "--query") {
    recordsOfEmp = getEmployeeRecord(cmdLineArgsObj["--empId"]);
    // console.log("hello", recordsOfEmp);
    totalQty = countQty(recordsOfEmp);
    recordsOfEmp = getQueryArray(recordsOfEmp, totalQty);
  }
  if (cmdLineArgsObj["action"] == "--save") {
  }
  return [recordsOfEmp];
};

exports.getTransactionRecord = getTransactionRecord;
exports.getString = getString;
exports.convertArrayToObj = convertArrayToObj;
