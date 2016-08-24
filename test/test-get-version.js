import getVersion from '../src/get-version';
import assert from 'assert';

export default function() {
  it('should create version string that contains a version number and git hash', () => {
    const version = getVersion({
      packageJSON: {
        version: "1.0.0",
      },
    });
    const regexVersion = /Version: (.*\d+\.\d+\.\d.*) Commit: (\w+)/;

    const resultVersion = regexVersion.exec(version);

    assert.ok(resultVersion, 'version number was formatted correctly');
    assert.equal(resultVersion[ 2 ].length, 7, 'git hash was 7 charachters');
  });
};
