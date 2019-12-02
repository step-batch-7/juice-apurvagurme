const getTransactionRecord = require('./src/beverageLib.js')
  .getTransactionRecord;
const config = require('./src/config');
const { timeStamp, getDataStorePath } = config;
const genericUtils = require('./src/genericUtils');
const { saveRecordToDatabase, getString } = genericUtils;
const fs = require('fs');

const main = function() {
  const cmdLineArgs = process.argv.slice(2);
  const date = timeStamp.bind(null, process.env);
  const path = getDataStorePath(process.env);
  const contents = fs.readFileSync(path, 'utf8');
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
