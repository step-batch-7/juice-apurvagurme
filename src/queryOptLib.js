const getQueryArray = function(recordsOfEmployee, quantity) {
  let records = recordsOfEmployee;
  records.push(["Total:" + " " + quantity + " " + "Juices"]);
  const heading = [
    "Employee ID",
    " " + "Beverage",
    " " + "Quantity",
    " " + "Date"
  ];
  records.unshift(heading);
  return records;
};

const countQty = function(first, listOfRecords) {
  return +listOfRecords["--qty"] + first;
};

const getEmployeeRecord = function(empId, contents) {
  let empRecords = JSON.parse(contents);
  let records = [];
  if (isOldEmployee(empId, empRecords)) {
    records = empRecords[empId];
  }
  return records;
};

const isOldEmployee = function(empId, empRecords) {
  let empIds = Object.keys(empRecords);
  return empIds.includes(empId);
};

const getRecordsOfParticularDate = function(date, recordsOfEmp) {
  let records = [];
  let givenDate = date.slice(0, 10);
  for (const recordOfEmp of recordsOfEmp) {
    let newDate = recordOfEmp["--date"].slice(0, 10);
    if (givenDate == newDate) {
      records.push(recordOfEmp);
    }
  }
  return records;
};

const processQuery = function(getListOfDetails, cmdLineArgsObj, contents) {
  let totalQty = 0;
  let records = contents;
  records = getEmployeeRecord(cmdLineArgsObj["--empId"], contents);
  if (cmdLineArgsObj.hasOwnProperty("--date")) {
    records = getRecordsOfParticularDate(cmdLineArgsObj["--date"], records);
  }
  totalQty = records.reduce(countQty, 0);
  records = records.map(getListOfDetails);
  records = getQueryArray(records, totalQty);
  return records;
};

exports.countQty = countQty;
exports.getEmployeeRecord = getEmployeeRecord;
exports.isOldEmployee = isOldEmployee;
exports.getQueryArray = getQueryArray;
exports.processQuery = processQuery;
exports.getRecordsOfParticularDate = getRecordsOfParticularDate;
