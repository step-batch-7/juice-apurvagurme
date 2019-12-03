const queryLib = require('./queryOptLib');
const { processQuery } = queryLib;
const saveOptLib = require('./saveOptLib');
const { processSave } = saveOptLib;
const genericUtils = require('./genericUtils');
const { getProcess, makeArrayToObj } = genericUtils;

const getTransactionRecord = function(
  cmdLineArgs,
  date,
  contents,
  funcRef,
  path
) {
  const actionRef = getActionFunc(cmdLineArgs[0]);
  let args = cmdLineArgs.slice(1);
  args = makeArrayToObj(args);
  recordsOfEmp = actionRef(
    getListOfDetails,
    args,
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
  return '--empId,--beverage,--qty,--date'
    .split(',')
    .map(key => transactionDetailsOfEmp[key]);
};

const defaultAction = function() {
  return [];
};

exports.getListOfDetails = getListOfDetails;
exports.getTransactionRecord = getTransactionRecord;
exports.getActionFunc = getActionFunc;
exports.defaultAction = defaultAction;
