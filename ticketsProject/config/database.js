import { Sequelize } from "sequelize";

const sequelize = new Sequelize('DB_ShopOnline', 'sa', '123', { 
    host: 'DESKTOP-60GHH4M',
    dialect: 'mssql',
    port: 1433,
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
