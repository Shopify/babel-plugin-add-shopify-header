import * as babel from 'babel-core';
import path from 'path';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should add to header from read', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        [pluginPath, {
          header: `?${path.resolve(__dirname, 'toRead')}`,
        }],
      ],
    });

    assertTest('test-add-to-header-from-read', source, 'Generated source matches expected source');
  });
}
