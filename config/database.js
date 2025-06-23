import { Sequelize } from "sequelize";

const sequelize = new Sequelize('ticketproject', 'root', '', { 
host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
    dialectOptions: { options: { encrypt: false } },
    logging: false,
});

try {
    await sequelize.authenticate();
    console.log('Kết nối SQL Server thành công!');
} catch (err) {
    console.error('Lỗi kết nối SQL Server:', err);
}

export default sequelize; 
