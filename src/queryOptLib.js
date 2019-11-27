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

const processQuery = function(
  cmdLineArgsObj,
  contents,
  funcRef,
  path,
  recordsOfEmp,
  date
) {
  let totalQty = 0;
  recordsOfEmp = getEmployeeRecord(cmdLineArgsObj["--empId"], contents);
  totalQty = recordsOfEmp.reduce(countQty, 0);
  // console.log(totalQty);

  recordsOfEmp = recordsOfEmp.map(getListOfDetails);
  recordsOfEmp = getQueryArray(recordsOfEmp, totalQty);
  return recordsOfEmp;
};

const getListOfDetails = function(transactionDetailsOfEmp) {
  return [
    transactionDetailsOfEmp["--empId"],
    transactionDetailsOfEmp["--beverage"],
    transactionDetailsOfEmp["--qty"],
    transactionDetailsOfEmp["date"]
  ];
};

exports.countQty = countQty;
exports.getEmployeeRecord = getEmployeeRecord;
exports.isOldEmployee = isOldEmployee;
exports.getQueryArray = getQueryArray;
exports.processQuery = processQuery;
exports.getListOfDetails = getListOfDetails;
