import * as babel from 'babel-core';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should work without any options', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        [pluginPath, {
          version: '1.0.0',
          commit: '2b93ca3',
        }],
      ],
    });

    assertTest('test-default', source, 'Generated source matches expected source');
  });
}
