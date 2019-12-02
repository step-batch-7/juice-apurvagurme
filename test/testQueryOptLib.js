const assert = require('assert');
const lib2 = require('../src/queryOptLib');
const {
  countQty,
  getQueryArray,
  processQuery,
  getDataOfGivenReq,
  isGivenDataPresent,
  validateQueryArgs
} = lib2;
const getListOfDetails = require('../src/beverageLib').getListOfDetails;

describe('validateQueryArgs', function() {
  it('should give true if the given options is 1 or more than 1 of from the present default values', function() {
    let actual = validateQueryArgs({ '--empId': '11111' });
    let expected = true;
    assert.strictEqual(actual, expected);
  });
  it('should give false if the given option is not present in default values', function() {
    let actual = validateQueryArgs({ '--empI': '11111' });
    let expected = false;
    assert.strictEqual(actual, expected);
  });
});

describe('isGivenDataPresent', function() {
  it('should give true for the matching data from array and objects', function() {
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
  it('should give false for the non matching data from array and objects', function() {
    let givenFieldsAndData = [['--empId', '12345']];
    let recordedDetail = {
      '--empId': '1234',
      '--beverage': 'Watermelon',
      '--qty': '1',
      '--date': '2019-11-20T05:29:47.793Z'
    };
    let expected = false;
    let actual = isGivenDataPresent(givenFieldsAndData, recordedDetail);
    assert.deepStrictEqual(actual, expected);
  });
});

describe('processQuery', function() {
  it('should give the details of the given empId', function() {
    let cmdLineArgsObj = { '--empId': '12345' };
    let contents =
      '[{"--empId":"12345","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]';
    let actual = processQuery(getListOfDetails, cmdLineArgsObj, contents);
    let expected = [
      'Employee ID, Beverage, Quantity, Date',
      ['12345', 'Watermelon', '1', '2019-11-20T05:29:47.793Z'],
      'Total: 1 Juices'
    ];
    assert.deepStrictEqual(actual, expected);
  });
  it('should give the details of the given empId', function() {
    let cmdLineArgsObj = { '--empId': '12345' };
    let contents =
      '[{"--empId":"1234","--beverage":"Watermelon","--qty":"1","--date":"2019-11-20T05:29:47.793Z"}]';
    let actual = processQuery(getListOfDetails, cmdLineArgsObj, contents);
    let expected = ['Employee ID, Beverage, Quantity, Date', 'Total: 0 Juices'];
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
    let cmdLineArgsObj = { '--empId': '12345' };
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
      '--empId': '12345'
    });
    let expected = [];
    assert.deepStrictEqual(actual, expected);
  });
  it('should give transaction details of employees using particular empId and beverage', function() {
    let fileContents =
      '[{ "--beverage": "Orange", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" },{ "--beverage": "Watermelon", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" }]';
    let argument = {
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
  it('should give transaction details of employees using particular beverage', function() {
    let fileContents =
      '[{ "--beverage": "Orange", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" },{ "--beverage": "Watermelon", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" }]';
    let argument = {
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
  it('should give transaction details of employees of the given date', function() {
    let fileContents =
      '[{ "--beverage": "Orange", "--qty": "1", "--empId": "111", "--date": "2019-11-20T05:29:47.793Z" },{ "--beverage": "Watermelon", "--qty": "1", "--empId": "111", "--date": "2019-11-28T05:29:47.793Z" }]';
    let argument = {
      '--date': '2019-11-20'
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
  it('should give the only header and footer if the given employeeId is not present in record', function() {
    let actual = getQueryArray([[]], 0);
    let expected = [
      'Employee ID, Beverage, Quantity, Date',
      [],
      'Total: 0 Juices'
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
