import fs from 'fs';
import path from 'path';

let packageJSON;

/**
 * This will return the package.json file defined in opts.cwd
 * @param  {Object} opts options object passed in. We will use the cwd var to look for package.json
 * @return {Object}      The current package.json object
 */
export default (opts) => {

  if (!packageJSON) {
    try {
      packageJSON = fs.readFileSync(path.join(opts.cwd, 'package.json'), 'utf8');
      packageJSON = JSON.parse(packageJSON);
    } catch (error) {
      throw new Error('Could not read in package.json make sure the cwd contains a package.json file. You may need to pass in cwd for add-shopify-headers options');
    }
  }

  return packageJSON;
};
