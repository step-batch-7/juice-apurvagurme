const assert = require('assert');
const saveOptFunc = require('../src/saveOptLib');
const {
  getSaveArray,
  saveEmpRecord,
  processSave,
  validateSaveArgs
} = saveOptFunc;
const getListOfDetails = require('../src/beverageLib').getListOfDetails;

describe('validateSaveArgs', function() {
  it('should give true when given inputs are correct', function() {
    let expected = true;
    let actual = validateSaveArgs({
      '--beverage': 'Orange',
      '--qty': '2',
      '--empId': '12345'
    });
    assert.strictEqual(actual, expected);
  });
  it('should give false when given inputs are not correct or not sufficeint for save option', function() {
    let expected = false;
    let actual = validateSaveArgs({ '--beverage': 'Orange', '--qty': '2' });
    assert.strictEqual(actual, expected);
  });
});

describe('processSave', function() {
  it('should get the saved transaction details', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    const date = function() {
      return new Date('2019-11-20T05:29:47.793Z');
    };
    let contents = '[]';
    let cmdLineArgsObj = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Watermelon',
      '--qty': '1'
    };
    let expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      ['11111', 'Watermelon', '1', '2019-11-20T05:29:47.793Z']
    ];
    let funcRef = saveRecord;
    let path = 'somePath';
    let actual = processSave(
      getListOfDetails,
      cmdLineArgsObj,
      contents,
      funcRef,
      path,
      date
    );
    assert.deepStrictEqual(actual, expected);
  });
  it('should give an empty array when invalid input is given', function() {
    const saveRecord = function(path) {
      if (path == 'somePath') {
        return true;
      }
    };
    let contents = '[]';
    let cmdLineArgsObj = {
      action: '--save',
      '--empId': '11111',
      '--beverage': 'Watermelon'
    };
    let expected = [];
    let funcRef = saveRecord;
    let path = 'somePath';
    let date = new Date('2019-11-20T05:29:47.793Z');
    let actual = processSave(
      getListOfDetails,
      cmdLineArgsObj,
      contents,
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
    const date = function() {
      return new Date('2019-11-20T05:29:47.793Z');
    };
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
    let actual = getSaveArray([
      '11111',
      'Orange',
      '1',
      '2019-11-30T08:33:18.325Z'
    ]);
    const expected = [
      'Transaction Recorded:',
      'Employee ID, Beverage, Quantity, Date',
      ['11111', 'Orange', '1', '2019-11-30T08:33:18.325Z']
    ];
    assert.deepStrictEqual(actual, expected);
  });
});
