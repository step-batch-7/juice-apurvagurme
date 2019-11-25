const lib = require("./src/beverageLib.js");
const { getTransactionRecord, getString, convertArrayToObj } = lib;
const lib2 = require("./src/queryOptLib.js");
const { countQty } = lib2;

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const cmdLineArgsObj = convertArrayToObj(cmdLineArgs);
  let recordOfEmployee = getTransactionRecord(cmdLineArgsObj);
  let transactionDetails = getString(recordOfEmployee[0]);
  console.log(transactionDetails);
};

main();
