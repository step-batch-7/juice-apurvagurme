const getQueryArray = function(recordsOfEmployee, quantity) {
  let records = recordsOfEmployee;
  // console.log(records);

  records.push(["Total:" + " " + quantity + " " + "Juices"]);
  const heading = [
    "Employee ID",
    " " + "Beverage",
    " " + "Quantity",
    " " + "Date"
  ];
  records.unshift(heading);
  // console.log(records);

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
    console.log(records);
  }
  return records;
};

const isOldEmployee = function(empId, empRecords) {
  let empIds = Object.keys(empRecords);
  return empIds.includes(empId);
};

exports.countQty = countQty;
exports.getEmployeeRecord = getEmployeeRecord;
exports.isOldEmployee = isOldEmployee;
exports.getQueryArray = getQueryArray;
