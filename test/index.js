import * as babel from 'babel-core';
import path from 'path';

const source = babel.transform('console.log("hey");', {
  plugins: [
    path.resolve(__dirname, '..', 'src', 'index.js'),
  ],
});

console.log(source.code);
