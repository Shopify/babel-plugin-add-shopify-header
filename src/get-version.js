import gitRevSync from 'git-rev-sync';

/**
 *  This function will return the default version string appended to the comment header.
 *  The version number is generated based on the latest git-tag and git-version. If the
 *  git-tag is not a version number then the package.json version number maybe used
 * 
 * @param  {Object} opts these are the options passed to the plugin. Mostly we use the package.json object for this function
 * @return {String}      formatted version string
 */
export default (opts) => {
  // Because commit and tag numbers will change for this module for testing purposes
  // we allow for passing in version and commit via opts. If this was not allowed then
  // most tests would fail once a new commit is made or this repo is tagged.
  // Fear not there's a test just to test this function.
  // this regex should match things like: 
  // 30.1.2
  // 1.1.1-alpha etc
  // 10.1.2b
  const regexVersion = /.*\d+\.\d+\.\d.*/;
  let versionNumber = opts.version || gitRevSync.tag();
  let commitHash = opts.commit || gitRevSync.short();

  // if git tag does not have a version number read in from package.json
  if(!regexVersion.test(versionNumber)) {
    versionNumber = opts.packageJSON.version;
  }

  return `Version: ${versionNumber} Commit: ${commitHash}`;
};
