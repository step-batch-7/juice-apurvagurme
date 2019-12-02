const assert = require('assert');
const lib1 = require('../src/beverageLib');
const {
  getTransactionRecord,
  convertArrayToObj,
  getListOfDetails,
  getActionFunc
} = lib1;
const queryLib = require('../src/queryOptLib');
const { processQuery } = queryLib;
const saveOptLib = require('../src/saveOptLib');
const { processSave } = saveOptLib;

describe('convertArrayToObj', function() {
  it('should give an object when given action is query', function() {
    let expectedValue = { '--empId': '11111' };
    assert.deepStrictEqual(
      convertArrayToObj(['--query', '--empId', '11111']),
      expectedValue
    );
  });
  it('should give an object when given action is save', function() {
    let expectedValue = { '--empId': '11111' };
    assert.deepStrictEqual(
      convertArrayToObj(['--save', '--empId', '11111']),
      expectedValue
    );
  });
});

describe('getTransactionRecord', function() {
  it('should give employee records when give task is query', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    let expectedValue = [
      'Employee ID, Beverage, Quantity, Date',
      ['12345', 'Watermelon', '1', '2019-11-20T05:29:47.793Z'],
      'Total: 1 Juices'
    ];
    let argument = ['--query', '--empId', '12345'];
    let date = new Date('2019-11-20T05:29:47.793Z');
    let fileContents =
      '[{"--empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]';
    let actual = getTransactionRecord(
      argument,
      date,
      fileContents,
      saveRecord,
      'somePath'
    );
    assert.deepStrictEqual(actual, expectedValue);
  });
  it('should give last transaction details', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    let expectedValue = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      ['12345', 'Watermelon', '1', '2019-11-20T05:29:47.793Z']
    ];
    let argument = [
      '--save',
      '--beverage',
      'Watermelon',
      '--empId',
      '12345',
      '--qty',
      '1'
    ];
    let date = new Date('2019-11-20T05:29:47.793Z');
    let fileContents =
      '[{"empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]';
    let actual = getTransactionRecord(
      argument,
      date,
      fileContents,
      saveRecord,
      'somePath'
    );
    assert.deepStrictEqual(actual, expectedValue);
  });
});

describe('getListOfDetails', function() {
  it('should give all the transaction details without ', function() {
    let expected = ['12345', 'Orange', '1', '2019-11-20T05:29:47.793Z'];
    let actual = getListOfDetails({
      '--empId': '12345',
      '--beverage': 'Orange',
      '--qty': '1',
      '--date': '2019-11-20T05:29:47.793Z'
    });
    assert.deepStrictEqual(actual, expected);
  });
});
describe('getActionFunc', function() {
  it('should give the function reference of desired action', function() {
    let actual = getActionFunc('--query');
    let expected = processQuery;
    assert.strictEqual(actual, expected);
  });
  it('should give the function reference of save function process', function() {
    let actual = getActionFunc('--save');
    let expected = processSave;
    assert.strictEqual(actual, expected);
  });
});
