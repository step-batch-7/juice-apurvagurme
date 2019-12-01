const assert = require('assert');
const lib2 = require('../src/queryOptLib');
const {
  countQty,
  getQueryArray,
  processQuery,
  getDataOfGivenReq,
  isGivenDataPresent
} = lib2;
const getListOfDetails = require('../src/beverageLib').getListOfDetails;

describe('isGivenDataPresent', function() {
  it('should give the matching data from array of objects', function() {
    let givenFieldsAndData = [['--empId', '12345']];
    let recordedDetail = {
      '--empId': '12345',
      '--beverage': 'Watermelon',
      '--qty': '1',
      '--date': '2019-11-20T05:29:47.793Z'
    };
    let expected = true;
    let actual = isGivenDataPresent(givenFieldsAndData, recordedDetail);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('processQuery', function() {
  it('should give the details of the given empId', function() {
    let cmdLineArgsObj = { action: '--query', '--empId': '12345' };
    let contents =
      '[{"--empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]';
    let recordsOfEmp = [];
    let actual = processQuery(
      getListOfDetails,
      cmdLineArgsObj,
      contents,
      recordsOfEmp
    );
    let expected = [
      'Employee ID, Beverage, Quantity, Date',
      ['12345', 'Watermelon', '1', '2019-11-20T05:29:47.793Z'],
      'Total: 1 Juices'
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('countQty', function() {
  it('should give a sum of quantities of juices', function() {
    let argument = { '--qty': '3' };
    assert.deepStrictEqual(countQty(0, argument), 3);
  });
});

describe('getDataOfGivenReq', function() {
  it('should give employee records when empId is given', function() {
    let contents =
      '[{"--beverage":"Watermelon","--empId":"12345","--qty":"1","action":"--save","--date":"2019-11-20T05:29:47.793Z"}]';
    let cmdLineArgsObj = { action: '--query', '--empId': '12345' };
    let actual = getDataOfGivenReq(contents, cmdLineArgsObj);
    let expected = [
      {
        '--beverage': 'Watermelon',
        '--qty': '1',
        '--empId': '12345',
        '--date': '2019-11-20T05:29:47.793Z',
        action: '--save'
      }
    ];

    assert.deepStrictEqual(actual, expected);
  });
  it('should give empty array if empId is not present in previous record', function() {
    let fileContents = '[]';
    let actual = getDataOfGivenReq(fileContents, {
      actual: '--query',
      '--empId': '12345'
    });
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });

  it('should give transaction details of employees used particular empId and beverage', function() {
    let fileContents =
      '[{ "--beverage": "Orange", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" },{ "--beverage": "Watermelon", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" }]';
    let argument = {
      action: '--query',
      '--empId': '111',
      '--beverage': 'Orange'
    };
    let expected = [
      {
        '--beverage': 'Orange',
        '--qty': '1',
        '--empId': '111',
        '--date': '2019-11-20T05:29:47.793Z'
      }
    ];
    let actual = getDataOfGivenReq(fileContents, argument);
    assert.deepStrictEqual(actual, expected);
  });
  it('should give transaction details of employees used particular beverage', function() {
    let fileContents =
      '[{ "--beverage": "Orange", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" },{ "--beverage": "Watermelon", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" }]';
    let argument = {
      action: '--query',
      '--beverage': 'Orange'
    };
    let expected = [
      {
        '--beverage': 'Orange',
        '--qty': '1',
        '--empId': '111',
        '--date': '2019-11-20T05:29:47.793Z'
      }
    ];
    let actual = getDataOfGivenReq(fileContents, argument);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getQueryArray', function() {
  it('should give the older transaction history of the given employee', function() {
    let actual = getQueryArray(
      [['11111', 'Orange', '3', '2019-11-20T05:29:47.793Z']],
      3
    );
    let expected = [
      'Employee ID, Beverage, Quantity, Date',
      ['11111', 'Orange', '3', '2019-11-20T05:29:47.793Z'],
      'Total: 3 Juices'
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
