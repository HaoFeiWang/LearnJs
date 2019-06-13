'use strict'

var fs = require("fs");

//异步读取文件
function testReadFile() {
    console.log("start read file");
    fs.readFile("file/testRead.txt", "utf-8", function (err, data) {
        if (err) {
            console.log("read error = " + err);
        } else {
            console.log("read result = " + data);
        }
    });
}

//同步读取文件
function testSyncReadFile(){
    console.log("start read file");
    fs.readFileSync()
}

module.exports = testReadFile;
