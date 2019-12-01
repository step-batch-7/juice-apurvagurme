const lib = require('./src/beverageLib.js');
const { getTransactionRecord, getString, convertArrayToObj } = lib;
const saveRecordToDatabase = require('./src/saveOptLib.js')
  .saveRecordToDatabase;
const config = require('./src/config');
const { timeStamp, getDataStorePath } = config;
const fs = require('fs');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const cmdLineArgsObj = convertArrayToObj(cmdLineArgs);
  const date = timeStamp.bind(null, process.env);
  const path = getDataStorePath.bind(null, process.env);
  const contents = fs.readFileSync(path(), 'utf8');
  let recordOfEmployee = getTransactionRecord(
    cmdLineArgsObj,
    date(),
    contents,
    saveRecordToDatabase,
    path()
  );
  let transactionDetails = getString(recordOfEmployee);
  console.log(transactionDetails);
};

main();
