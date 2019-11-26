const fs = require("fs");

const getSaveArray = function(recordsOfEmployee) {
  let records = [recordsOfEmployee];
  const heading = [
    "Employee ID",
    " " + "Beverage",
    " " + "Quantity",
    " " + "Date"
  ];
  records.unshift(heading);
  records.unshift(["Transaction Recorded:"]);
  return records;
};

const saveEmpRecord = function(cmdLineArgsObj, date, contents) {
  let parsedContents = JSON.parse(contents);
  let transactionRecord = cmdLineArgsObj;
  let empId = cmdLineArgsObj["--empId"];
  if (!parsedContents.hasOwnProperty(empId)) {
    parsedContents[empId] = [];
  }
  delete transactionRecord["action"];
  transactionRecord["date"] = date;
  parsedContents[empId].push(transactionRecord);
  JSON.stringify(
    fs.writeFileSync("./records.json", JSON.stringify(parsedContents), "utf8")
  );
  return transactionRecord;
};

exports.getSaveArray = getSaveArray;
exports.saveEmpRecord = saveEmpRecord;
