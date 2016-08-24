import pluginAddHeader from 'babel-plugin-add-header-comment';

import getDefaultHeader from './get-default-header';
import getPackageJSON from './get-package-json';

/**
 * This babel plugin will append a default Shopify header to files defined (see README.md for examples). A default shopify
 * header consists of:
 * - license
 * - version number
 *
 * @param  {Object} babel babel passes this bad boy in
 * @return {Object}       a babel plugin/visitor
 */
export default function(babel) {
  // get an instance of the `babel-plugin-add-header-comment`
  const plugin = pluginAddHeader(babel);
  const visitor = plugin.visitor;
  const ProgramOriginal = visitor.Program.bind(visitor);

  plugin.visitor.Program = function(path, state) {
    const opts = Object.assign(
      {
        newLineChar: '\n',
        cwd: process.cwd(),
      },
      state.opts
    );

    // read in the package-json
    opts.packageJSON = getPackageJSON(opts);

    const newState = Object.assign({}, state);
    const newOpts = Object.assign({}, opts);
    newState.opts = newOpts;

    // if a header is defined then prepend the default header
    // and add the defined header after
    if (newOpts.header) {
      newOpts.header = getDefaultHeader(opts).concat(opts.header);
    // files are defined so add default headers to files
    } else if (opts.files) {
      let newFiles;

      // if files is an array then we want to add the default header
      // to those files
      if (Array.isArray(opts.files)) {
        newFiles = opts.files.reduce((nFiles, file) => {
          nFiles[file] = {};
          nFiles[file].header = getDefaultHeader(opts);

          return nFiles;
        }, {});
      // we'll assume files is an Object in which case we want to add the
      // default header to the those headers
      } else {
        newFiles = {};

        // loop through each file and prepend default headers to those files
        Object.keys(opts.files).forEach((keyFile) => {
          newFiles[keyFile] = {};
          newFiles[keyFile].header = getDefaultHeader(opts).concat(opts.files[keyFile].header);
        });
      }

      newOpts.files = newFiles;
    // header or files are not defined create a new header
    } else {
      newOpts.header = getDefaultHeader(opts);
    }

    ProgramOriginal(path, newState);
  };

  return plugin;
}
