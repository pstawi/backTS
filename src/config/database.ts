import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    host:'localhost',
    // port:parseInt('3306'),
    database:'backts_cda',
    username:'root',
    password:'root',
    dialect: "mysql"

    // logging: 'dev' === console.log : true

});

export {sequelize}