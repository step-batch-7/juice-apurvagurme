const getTransactionRecord = require('./src/beverageLib.js')
  .getTransactionRecord;
const config = require('./src/config');
const { timeStamp, getDataStorePath } = config;
const genericUtils = require('./src/genericUtils');
const { saveRecordToDatabase, getString, readFile } = genericUtils;
const fs = require('fs');
let { readFileSync, existsSync } = fs;

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const date = timeStamp.bind(null, process.env);
  const path = getDataStorePath(process.env);
  const contents = readFile(path, readFileSync, existsSync);
  let recordOfEmployee = getTransactionRecord(
    cmdLineArgs,
    date,
    contents,
    saveRecordToDatabase,
    path
  );
  let transactionDetails = getString(recordOfEmployee);
  console.log(transactionDetails);
};

main();
