const queryLib = require('./queryOptLib');
const { processQuery } = queryLib;
const saveOptLib = require('./saveOptLib');
const { processSave } = saveOptLib;
const genericUtils = require('./genericUtils');
const { getProcess, makeArrayToObj } = genericUtils;

const convertArrayToObj = function(cmdLineArgs) {
  let object = {};
  let args = cmdLineArgs;
  args = args.slice(1);
  object = makeArrayToObj(args);
  return object;
};

const getTransactionRecord = function(
  cmdLineArgs,
  date,
  contents,
  funcRef,
  path
) {
  const actionRef = getActionFunc(cmdLineArgs[0]);
  const cmdLineArgsObj = convertArrayToObj(cmdLineArgs);
  recordsOfEmp = actionRef(
    getListOfDetails,
    cmdLineArgsObj,
    contents,
    funcRef,
    path,
    date
  );
  return recordsOfEmp;
};

const getActionFunc = function(action) {
  const object = { '--query': processQuery, '--save': processSave };
  let funcRefAction = getProcess(object, action, defaultAction);
  return funcRefAction;
};

const getListOfDetails = function(transactionDetailsOfEmp) {
  return [
    transactionDetailsOfEmp['--empId'],
    transactionDetailsOfEmp['--beverage'],
    transactionDetailsOfEmp['--qty'],
    transactionDetailsOfEmp['--date']
  ];
};

const defaultAction = function() {
  return [];
};

exports.getListOfDetails = getListOfDetails;
exports.getTransactionRecord = getTransactionRecord;
exports.convertArrayToObj = convertArrayToObj;
exports.getActionFunc = getActionFunc;
