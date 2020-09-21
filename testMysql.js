const Sequelize = require('sequelize');
const config = require("./config");

//创建Sequelize实例
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    }
)

//创建数据模型Person，告诉Sequelize如何映射数据库表（参数3是关闭Sequelize自动添加timestamp的功能）
var Person = sequelize.define(
    'persion',
    {
        id: {
            type: Sequelize.STRING(50),
            primaryKey: true
        },
        name: Sequelize.STRING(100),
        gender: Sequelize.BOOLEAN,
        birth: Sequelize.STRING(10),
        createdAt: Sequelize.BIGINT,
        updatedAt: Sequelize.BIGINT,
    },
    {
        timestamps: false,
        tableName: 'person'
    }
);

//插入一条数据
var now = Date.now();
Person.create({
    id: "1",
    name: "jack",
    gender: false,
    birth: "1993.12.28",
    createdAt: now,
    updatedAt: now
}).then(function (value) {
    console.log("create success = " + value);
}).catch(function (error) {
    console.log("create faile = " + error);
});

//查询所有数据
Person.findAll()
    .then((value) => {
        for(let person of value){
            console.log("find all success = "+JSON.stringify(person));
        }
    }).catch((error) => {
        console.log("find all error = "+error);
    });

//使用await
(async () => {
    var person = await Person.findAll()[0];
    person.gender = true;
    person.updatedAt = Date.now();
    await person.save();
});


module.exports = now





