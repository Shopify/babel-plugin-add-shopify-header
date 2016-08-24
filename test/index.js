import testAddToHeader from './test-add-to-header';
import testAddToHeaderFromExec from './test-add-to-header-from-exec';
import testAddToHeaderFromRead from './test-add-to-header-from-read';
import testDefault from './test-default';
import testGetVersion from './test-get-version';
import testManyFiles from './test-many-files';
import testManyFilesAddToHeader from './test-many-files-add-to-header';

describe('Using plugin in different ways', () => {
  testDefault();
  testManyFiles();
  testAddToHeader();
  testManyFilesAddToHeader();
  testAddToHeaderFromRead();
  testAddToHeaderFromExec();
  testGetVersion();
});
