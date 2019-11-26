const fs = require("fs");
const queryLib = require("./queryOptLib");
const { getEmployeeRecord, getQueryArray, countQty } = queryLib;
const saveOptLib = require("./saveOptLib");
const { saveEmpRecord, getSaveArray } = saveOptLib;

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

const getTransactionRecord = function(cmdLineArgsObj, date, contents) {
  let recordsOfEmp = [];
  let totalQty = 0;
  if (cmdLineArgsObj["action"] == "--query") {
    recordsOfEmp = getEmployeeRecord(cmdLineArgsObj["--empId"], contents);
    totalQty = recordsOfEmp.reduce(countQty, 0);
    recordsOfEmp = recordsOfEmp.map(getListOfDetails);
    recordsOfEmp = getQueryArray(recordsOfEmp, totalQty);
    // console.log(recordsOfEmp);
  }
  if (cmdLineArgsObj["action"] == "--save") {
    recordsOfEmp = saveEmpRecord(cmdLineArgsObj, date, contents);
    recordsOfEmp = getListOfDetails(recordsOfEmp);
    recordsOfEmp = getSaveArray(recordsOfEmp);
  }
  // console.log(recordsOfEmp);

  return recordsOfEmp;
};

const getListOfDetails = function(transactionDetailsOfEmp) {
  return [
    transactionDetailsOfEmp["--empId"],
    transactionDetailsOfEmp["--beverage"],
    transactionDetailsOfEmp["--qty"],
    transactionDetailsOfEmp["date"]
  ];
};

exports.getTransactionRecord = getTransactionRecord;
exports.getString = getString;
exports.convertArrayToObj = convertArrayToObj;
exports.getListOfDetails = getListOfDetails;
