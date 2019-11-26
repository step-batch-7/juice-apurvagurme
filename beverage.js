const lib = require("./src/beverageLib.js");
const { getTransactionRecord, getString, convertArrayToObj } = lib;
const fs = require("fs");

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const cmdLineArgsObj = convertArrayToObj(cmdLineArgs);
  const date = new Date().toJSON();
  const contents = fs.readFileSync("./records.json", "utf8");
  let recordOfEmployee = getTransactionRecord(cmdLineArgsObj, date, contents);
  let transactionDetails = getString(recordOfEmployee);
  console.log(transactionDetails);
};

main();
