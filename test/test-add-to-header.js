import * as babel from 'babel-core';
import pluginPath from './plugin-path';
import assertTest from './assert-test';

export default function() {
  it('should add extra line to header', () => {

    const source = babel.transform('console.log("nom nom nom");', {
      plugins: [
        [pluginPath, {
          header: 'Add this in',
        }],
      ],
    });

    assertTest('test-add-to-header', source, 'Generated source matches expected source');
  });
}
