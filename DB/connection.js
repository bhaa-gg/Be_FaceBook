import { Sequelize } from 'sequelize';
export const Sequelize_Connnection = new Sequelize('bhjw5pnsft9tyfq1fjkv', 'uliiybr2qr464bgi', 'EsdteuyTofaJIyk6OwIK', {
    host: 'bhjw5pnsft9tyfq1fjkv-mysql.services.clever-cloud.com',
    dialect: "mysql"
});


export const dbConn = Sequelize_Connnection.sync({ alter: true, force: false }).then(() => {
    console.log("Connection established with database ");

}).catch(err => console.log("DB Connection error: " + err));

export default dbConn;