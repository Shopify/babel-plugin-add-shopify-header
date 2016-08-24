import * as babel from 'babel-core';
import path from 'path';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should add to header from exec', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        [pluginPath, {
          header: `!node ${path.resolve(__dirname, 'toExec.js')}`,
          version: '1.0.0',
          commit: '2b93ca3',
        }],
      ],
    });

    assertTest('test-add-to-header-from-exec', source, 'Generated source matches expected source');
  });
}
