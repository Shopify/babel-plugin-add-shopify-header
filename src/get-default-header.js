import getVersion from 'get-project-version';

import getLicense from './get-license';

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
    version = getVersion({
      tag: opts.version,
      commit: opts.commit,
    });
  }

  return [
    license,
    version,
  ];
};
