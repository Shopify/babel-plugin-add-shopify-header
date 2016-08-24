import getLicense from './get-license';
import getVersion from './get-version';

let license;
let version;

/**
 * Returns a formatted array of header parts.
 * @param  {Object} opts Plugin options passed in
 * @return {Array}       Returns an Array of license header parts. In specific returns the license and version number
 */
export default (opts) => {

  if (!license) {
    // get the license file contents
    license = getLicense(opts);

    // create the version string
    version = getVersion(opts);
  }

  return [
    license,
    version,
  ];
};
