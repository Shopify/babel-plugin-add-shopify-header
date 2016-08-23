import * as babel from 'babel-core';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should work without any options', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        pluginPath,
      ],
    });

    assertTest('test-default', source, 'Generated source matches expected source');
  });
}
