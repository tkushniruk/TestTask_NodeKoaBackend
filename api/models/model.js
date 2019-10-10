const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@127.0.0.1:3306/restfull_database');

class Error_reports extends Model {
}

Error_reports.init({
    host: DataTypes.STRING,
    code: DataTypes.INTEGER,
    message: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
}, {sequelize, modelName: 'error_reports'});

module.exports = Error_reports;