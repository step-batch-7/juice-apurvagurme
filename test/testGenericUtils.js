const genericUtils = require('../src/genericUtils');
const { makeArrayToObj, getProcess, getString } = genericUtils;
const assert = require('assert');

describe('getProcess', function() {
  it('should give function Reference of the process to perform when action is query', function() {
    let action = '--query';
    let object = { '--query': 'processQuery', '--save': 'processSave' };
    let actual = getProcess(object, action, 'funcRef');
    let expected = 'processQuery';
    assert.deepStrictEqual(actual, expected);
  });
  it('should give function Reference of the process to perform when action is save', function() {
    let action = '--save';
    let object = { '--query': 'processQuery', '--save': 'processSave' };
    let actual = getProcess(object, action, 'funcRef');
    let expected = 'processSave';
    assert.deepStrictEqual(actual, expected);
  });
  it('should give empty array when action is not valid', function() {
    let action = '--beverage';
    let object = { '--query': 'processQuery', '--save': 'processSave' };
    let actual = getProcess(object, action, 'funcRef');
    let expected = 'funcRef';
    assert.deepStrictEqual(actual, expected);
  });
});

describe('getString', function() {
  it('should give a joined string when an array of string is given', function() {
    let expectedValue = 'a,b,c\nd,e';
    let actual = getString([
      ['a', 'b', 'c'],
      ['d', 'e']
    ]);
    assert.deepStrictEqual(actual, expectedValue);
  });
  it('should give a joined string when an array consists of arrays and strings ', function() {
    let expectedValue = 'Transaction Recorded\na,b,c\nTotal Juices : 3';
    let actual = getString([
      'Transaction Recorded',
      ['a', 'b', 'c'],
      'Total Juices : 3'
    ]);
    assert.deepStrictEqual(actual, expectedValue);
  });
});

describe('makeArrayToObject', function() {
  it('should give an object of the given array whose 1st element is key and 2nd is value', function() {
    let expected = { '--beverage': 'Orange', '--qty': '2', '--empId': '12345' };
    let actual = makeArrayToObj([
      '--beverage',
      'Orange',
      '--qty',
      '2',
      '--empId',
      '12345'
    ]);
    assert.deepStrictEqual(actual, expected);
  });
  it('should give an object if given array consits of odd number of elements with the last value as undefined', function() {
    let expected = { '--empId': '123', xyz: undefined };
    let actual = makeArrayToObj(['--empId', '123', 'xyz']);
    assert.deepStrictEqual(actual, expected);
  });
});
