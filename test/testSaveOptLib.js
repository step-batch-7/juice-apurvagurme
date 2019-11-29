const assert = require('assert');
const saveOptFunc = require('../src/saveOptLib');
const { getSaveArray, saveEmpRecord, processSave } = saveOptFunc;
const getListOfDetails = require('../src/beverageLib').getListOfDetails;

describe('processSave', function() {
  it('get the saved transaction details', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    let contents = '[]';
    let cmdLineArgsObj = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Watermelon',
      '--qty': '1'
    };
    let expected = [
      ['Transaction Recorded:'],
      'Employee ID, Beverage, Quantity, Date',
      ['11111', 'Watermelon', '1', '2019-11-20T05:29:47.793Z']
    ];
    let recordsOfEmp = [];
    let funcRef = saveRecord;
    let path = 'somePath';
    let date = '2019-11-20T05:29:47.793Z';
    let actual = processSave(
      getListOfDetails,
      cmdLineArgsObj,
      contents,
      recordsOfEmp,
      funcRef,
      path,
      date
    );
    assert.deepStrictEqual(actual, expected);
  });
});

describe('saveEmpRecord', function() {
  it('should write or save the new transaction details to the file', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    let date = '2019-11-20T05:29:47.793Z';
    let fileContents = '[]';
    let cmdLineArgsObj = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Watermelon',
      '--qty': '1'
    };
    let actual = saveEmpRecord(
      cmdLineArgsObj,
      date,
      fileContents,
      saveRecord,
      'somePath'
    );
    let expected = [
      {
        '--empId': '11111',
        '--beverage': 'Watermelon',
        '--qty': '1',
        '--date': '2019-11-20T05:29:47.793Z',
        action: '--save'
      }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getSaveArray', function() {
  it('get array of transaction records that is recorded', function() {
    let actual = getSaveArray(['11111', 'Orange', '1', '--date']);
    let expected = [
      ['Transaction Recorded:'],
      'Employee ID, Beverage, Quantity, Date',
      ['11111', 'Orange', '1', '--date']
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
