const getQueryArray = function(recordsOfEmployee, quantity) {
  let records = recordsOfEmployee;
  records.push(['Total: ', quantity, ' Juices'].join(''));
  const heading = ['Employee ID', ' Beverage', ' Quantity', ' Date'].join(',');
  records.unshift(heading);
  return records;
};

const countQty = function(first, listOfRecords) {
  return +listOfRecords['--qty'] + first;
};

const getEmployeeRecord = function(contents, cmdLineArgsObj) {
  let empRecords = JSON.parse(contents);
  let givenData = cmdLineArgsObj;
  let records = [];
  for (const key in givenData) {
    for (const iterator of empRecords) {
      if (givenData[key] == iterator[key]) {
        records.push(iterator);
      }
    }
  }
  return records;
};

const getRecordsOfParticularDate = function(date, recordsOfEmp) {
  let records = [];
  let givenDate = date.slice(0, 10);
  for (const recordOfEmp of recordsOfEmp) {
    let newDate = recordOfEmp['--date'].slice(0, 10);
    if (givenDate == newDate) {
      records.push(recordOfEmp);
    }
  }
  return records;
};

const processQuery = function(getListOfDetails, cmdLineArgsObj, contents) {
  let totalQty = 0;
  let records = contents;

  records = getEmployeeRecord(contents, cmdLineArgsObj);
  if (cmdLineArgsObj.hasOwnProperty('--date')) {
    records = getRecordsOfParticularDate(cmdLineArgsObj['--date'], records);
  }
  totalQty = records.reduce(countQty, 0);
  records = records.map(getListOfDetails);
  records = getQueryArray(records, totalQty);
  return records;
};

exports.countQty = countQty;
exports.getEmployeeRecord = getEmployeeRecord;
exports.getQueryArray = getQueryArray;
exports.processQuery = processQuery;
exports.getRecordsOfParticularDate = getRecordsOfParticularDate;
