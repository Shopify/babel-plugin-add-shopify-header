import pluginAddHeader from 'babel-plugin-add-header-comment';
import fs from 'fs';
import fspath from 'path';

const LICENSE = fs.readFileSync(fspath.resolve(__dirname, '..', 'LICENSE.md'), 'utf8');

export default function(babel) {
  const plugin = pluginAddHeader(babel);
  const visitor = plugin.visitor;
  const ProgramOriginal = visitor.Program.bind(visitor);

  plugin.visitor.Program = function(path, state) {
    const opts = state.opts;
    const newState = Object.assign({}, state);
    const newOpts = Object.assign({}, opts);
    newState.opts = newOpts;

    // if a header is defined then prepend the default header
    // and add the defined header after
    if (newOpts.header) {
      newOpts.header = getDefaultHeader().concat(opts.header);
    // files are defined so add default headers to files
    } else if (opts.files) {
      let newFiles;

      // if files is an array then we want to add the default header
      // to those files
      if (Array.isArray(opts.files)) {
        newFiles = opts.files.reduce((nFiles, file) => {
          nFiles[file] = {};
          nFiles[file].header = getDefaultHeader();

          return nFiles;
        }, {});
      // we'll assume files is an Object in which case we want to add the
      // default header to the those headers
      } else {
        newFiles = {};

        // loop through each file and prepend default headers to those files
        Object.keys(opts.files).forEach((keyFile) => {
          newFiles[keyFile] = {};
          newFiles[keyFile].header = getDefaultHeader().concat(opts.files[keyFile].header);
        });
      }

      newOpts.files = newFiles;
    // header or files are not defined create a new header
    } else {
      newOpts.header = getDefaultHeader();
    }

    ProgramOriginal(path, newState);
  };

  return plugin;
}

function getDefaultHeader() {
  return [
    LICENSE,
  ];
}
