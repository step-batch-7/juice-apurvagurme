const fs = require("fs");
let contents = fs.readFileSync("./records.json", "utf8");

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

const countQty = function(listOfRecords) {
  return listOfRecords.reduce(getSumOfQty, 0);
};

const getSumOfQty = function(sumOfQty, listOfRecords) {
  let qty = +listOfRecords[2];
  return sumOfQty + qty;
};

const getEmployeeRecord = function(empId) {
  let empRecords = JSON.parse(contents);
  let records = [];
  if (isOldEmployee(empId, empRecords)) {
    empRecords = empRecords[empId];
    records = empRecords.map(employeeRecords);
  }
  return records;
};

const isOldEmployee = function(empId, empRecords) {
  let empIds = Object.keys(empRecords);
  return empIds.includes(empId);
};

const employeeRecords = function(empRecords) {
  return Object.values(empRecords);
};

exports.countQty = countQty;
exports.getSumOfQty = getSumOfQty;
exports.getEmployeeRecord = getEmployeeRecord;
exports.employeeRecords = employeeRecords;
exports.isOldEmployee = isOldEmployee;
exports.getQueryArray = getQueryArray;
