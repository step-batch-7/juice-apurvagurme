const getSaveArray = function(recordsOfEmployee) {
  let records = [recordsOfEmployee];
  const heading = ['Employee ID', ' Beverage', ' Quantity', ' Date'].join(',');
  records.unshift(heading);
  records.unshift('Transaction Recorded:');
  return records;
};

const saveEmpRecord = function(cmdLineArgsObj, date, contents, funcRef, path) {
  let parsedContents = JSON.parse(contents);
  let transactionRecord = cmdLineArgsObj;
  transactionRecord['--date'] = date().toJSON();
  parsedContents.push(transactionRecord);
  funcRef(path, parsedContents);
  return parsedContents;
};

const validateSaveArgs = function(cmdLineArgsObj) {
  const mandatoryOpts = ['--beverage', '--qty', '--empId'];
  return mandatoryOpts.every(key => cmdLineArgsObj.hasOwnProperty(key));
};

const processSave = function(
  getListOfDetails,
  cmdLineArgsObj,
  contents,
  funcRef,
  path,
  date
) {
  if (!validateSaveArgs(cmdLineArgsObj)) {
    return [];
  }
  saveEmpRecord(cmdLineArgsObj, date, contents, funcRef, path);
  recordsOfEmp = getListOfDetails(cmdLineArgsObj);
  recordsOfEmp = getSaveArray(recordsOfEmp);
  return recordsOfEmp;
};

exports.getSaveArray = getSaveArray;
exports.saveEmpRecord = saveEmpRecord;
exports.processSave = processSave;
exports.validateSaveArgs = validateSaveArgs;
