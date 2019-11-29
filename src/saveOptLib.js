const fs = require('fs');

const getSaveArray = function(recordsOfEmployee) {
  let records = [recordsOfEmployee];
  const heading = ['Employee ID', ' Beverage', ' Quantity', ' Date'].join(',');
  records.unshift(heading);
  records.unshift(['Transaction Recorded:']);
  return records;
};

const saveEmpRecord = function(cmdLineArgsObj, date, contents, funcRef, path) {
  let parsedContents = JSON.parse(contents);
  let transactionRecord = cmdLineArgsObj;
  transactionRecord['--date'] = date;
  parsedContents.push(transactionRecord);
  funcRef(path, parsedContents);
  return parsedContents;
};

const saveRecordToDatabase = function(path, parsedContents) {
  return JSON.stringify(
    fs.writeFileSync(path, JSON.stringify(parsedContents), 'utf8')
  );
};

const processSave = function(
  getListOfDetails,
  cmdLineArgsObj,
  contents,
  recordsOfEmp,
  funcRef,
  path,
  date
) {
  saveEmpRecord(cmdLineArgsObj, date, contents, funcRef, path);
  recordsOfEmp = getListOfDetails(cmdLineArgsObj);
  recordsOfEmp = getSaveArray(recordsOfEmp);
  return recordsOfEmp;
};

exports.getSaveArray = getSaveArray;
exports.saveEmpRecord = saveEmpRecord;
exports.saveRecordToDatabase = saveRecordToDatabase;
exports.processSave = processSave;
