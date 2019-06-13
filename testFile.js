'use strict'

var fs = require("fs");
var FILE = {};

//异步读取文件
FILE.testReadFile = function(){
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
FILE.testSyncReadFile = function(){
    console.log("start sync read file");
    try {
        var data = fs.readFileSync("file/testRead.txt","utf-8");
        console.log("sync read file = "+data);
    } catch (error) {
        console.log("sync read file error = "+error);
    }
}

//异步写文件
FILE.testWriteFile = function(data){
    console.log("start write file");
    fs.writeFile("file/testRead.txt",data,function(err){
        if(err){
            console.log("write file error = "+err);
        }else{
            console.log("write file success");
        }
    });
}

//同步写文件
FILE.testSyncWriteFile = function(data){
    console.log("start sync write file");
    try {
        var result = fs.writeFileSync("file/testRead.txt",data);
        console.log("sync write file success")
    } catch (error) {
        console.log("sync write file error = "+error);
    }
}

FILE.testGetState = function(){
    //同样有同步方法
    fs.stat("file/testRead.txt",function(err,stats){
        if(err){
            console.log("get state error = "+err);
        }else{
            console.log("this is file = "+stats.isFile());
            console.log("this is directory = "+stats.isDirectory());
            console.log("file size = "+stats.size);
            //创建时间：birthtime = ctime
            console.log("file birthtime = "+stats.birthtime);
            console.log("file ctime = "+stats.ctime);
            console.log("file change time = "+stats.mtime);
        }
    })
}

module.exports = FILE;
