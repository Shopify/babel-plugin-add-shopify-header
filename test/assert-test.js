import assert from 'assert';
import fs from 'fs';
import path from 'path';

/**
 * This function will compare compare generated source with expected source from the fixtures folder.
 * 
 * @param  {String} testName This is the test name we're running eg. if 'test-default.js' is calling this function pass 'test-default'
 * @param  {[type]} source   The generated source object (ast + code) from babel
 * @param  {[type]} message  This message will be the assertion message
 */
export default (testName, source, message) => {
  const codeExpected = fs.readFileSync(path.join(__dirname, 'fixtures', `expect-${testName}.js`));

  assert.equal(source.code, codeExpected, message);
};