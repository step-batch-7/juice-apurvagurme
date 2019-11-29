const queryLib = require('./queryOptLib');
const { processQuery } = queryLib;
const saveOptLib = require('./saveOptLib');
const { processSave } = saveOptLib;
const getProcess = require('./genericUtils').getProcess;

const convertArrayToObj = function(cmdLineArgs) {
  let object = {};
  let args = cmdLineArgs;
  args = args.slice(1);
  for (let index = 0; index < args.length; index = index + 2) {
    object[args[index]] = args[index + 1];
  }
  if (cmdLineArgs.includes('--save')) {
    object['action'] = '--save';
  }
  if (cmdLineArgs.includes('--query')) {
    object['action'] = '--query';
  }
  return object;
};

const getString = function(recordOfTransaction) {
  let records = recordOfTransaction;
  return records.join('\n');
};

const getTransactionRecord = function(
  cmdLineArgsObj,
  date,
  contents,
  funcRef,
  path
) {
  const object = { '--query': processQuery, '--save': processSave };
  let recordsOfEmp = [];
  let funcRefAction = getProcess(object, cmdLineArgsObj['action']);
  recordsOfEmp = funcRefAction(
    getListOfDetails,
    cmdLineArgsObj,
    contents,
    recordsOfEmp,
    funcRef,
    path,
    date
  );

  return recordsOfEmp;
};

const getListOfDetails = function(transactionDetailsOfEmp) {
  return [
    transactionDetailsOfEmp['--empId'],
    transactionDetailsOfEmp['--beverage'],
    transactionDetailsOfEmp['--qty'],
    transactionDetailsOfEmp['--date']
  ];
};

exports.getListOfDetails = getListOfDetails;
exports.getTransactionRecord = getTransactionRecord;
exports.getString = getString;
exports.convertArrayToObj = convertArrayToObj;
