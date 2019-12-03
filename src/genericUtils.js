fs = require('fs');

const getProcess = function(object, action, defaultValue) {
  if (object.hasOwnProperty(action)) {
    return object[action];
  }
  return defaultValue;
};

const getString = function(recordOfTransaction) {
  return recordOfTransaction.join('\n');
};

const makeArrayToObj = function(array, prevObj = {}) {
  if (array.length == 0) {
    return {};
  }
  prevObj[array[0]] = array[1];
  return Object.assign(prevObj, makeArrayToObj(array.slice(2)));
};

const readFile = function(path, readFunc, isExistFunc) {
  if (isExistFunc(path)) {
    return readFunc(path, 'utf8');
  }
  return '[]';
};

const saveRecordToDatabase = function(path, parsedContents) {
  fs.writeFileSync(path, JSON.stringify(parsedContents), 'utf8');
};

exports.saveRecordToDatabase = saveRecordToDatabase;
exports.makeArrayToObj = makeArrayToObj;
exports.getString = getString;
exports.getProcess = getProcess;
exports.readFile = readFile;
