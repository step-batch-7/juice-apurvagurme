const getQueryArray = function(recordsOfEmployee, quantity) {
  let records = recordsOfEmployee;
  records.push(`Total: ${quantity} Juice${quantity == 1 ? '' : 's'}`);
  const heading = `Employee ID, Beverage, Quantity, Date`;
  records.unshift(heading);
  return records;
};

const countQty = function(first, listOfRecords) {
  return +listOfRecords['--qty'] + first;
};

const validateQueryArgs = function(cmdLineArgsObj) {
  const mandatoryOpts = ['--beverage', '--qty', '--empId', '--date'];
  return mandatoryOpts.some(key => cmdLineArgsObj.hasOwnProperty(key));
};

const getDataOfGivenReq = function(contents, cmdLineArgsObj) {
  const fileContents = JSON.parse(contents);
  let givenFieldsAndData = cmdLineArgsObj;
  givenFieldsAndData = Object.entries(givenFieldsAndData);
  const requiredDetails = fileContents.filter(
    isGivenDataPresent.bind(null, givenFieldsAndData)
  );
  return requiredDetails;
};

const isGivenDataPresent = function(givenFieldsAndData, recordedDetail) {
  let record = { ...recordedDetail };
  record['--date'] = record['--date'].split('T', 1);
  return givenFieldsAndData.every(
    givenField => givenField[1] == record[givenField[0]]
  );
};

const processQuery = function(getListOfDetails, cmdLineArgsObj, contents) {
  let totalQty = 0;
  let records = contents;
  if (!validateQueryArgs(cmdLineArgsObj)) {
    return [];
  }
  records = getDataOfGivenReq(contents, cmdLineArgsObj);
  totalQty = records.reduce(countQty, 0);
  records = records.map(getListOfDetails);
  records = getQueryArray(records, totalQty);
  return records;
};

exports.countQty = countQty;
exports.getQueryArray = getQueryArray;
exports.processQuery = processQuery;
exports.getDataOfGivenReq = getDataOfGivenReq;
exports.isGivenDataPresent = isGivenDataPresent;
exports.validateQueryArgs = validateQueryArgs;
