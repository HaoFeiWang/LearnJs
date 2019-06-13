'use strict'

var FILE = require('./testFile');

FILE.testReadFile();
FILE.testSyncReadFile();
FILE.testWriteFile("Hello Dart!");
FILE.testSyncWriteFile("Hello Fluter!");
FILE.testGetState();