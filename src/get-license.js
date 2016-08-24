import fs from 'fs';
import path from 'path';

/**
 * Will return the LICENSE file. Will look for any file that starts with license.
 * @param  {Objec} opts Plugin options. We will use cwd to look for the license file
 * @return {String}     The contents of the LICENSE file
 */
export default (opts) => {
  const files = fs.readdirSync(opts.cwd);

  const fileLicense = files.reduce((license, file) => {
    if (/license/.test(file.toLowerCase())) {
      return file;
    }

    return license;
  }, null);

  if (!fileLicense) {
    throw new Error("Could not find a LICENSE file in the current working directory. You may need to pass in cwd through options for `add-shopify-header`");
  }

  return fs.readFileSync(path.join(process.cwd(), fileLicense), 'utf8');
};
