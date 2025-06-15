import { Sequelize } from "sequelize";
import sequelize from "../config/database.js"; // Import file database.js theo chuẩn ES Module

// Khởi tạo object db
const db = {};

// Import các models
import User from "./user.js";
import Category from "./category.js";
import Brand from "./brand.js";
import Product from "./product.js";
import Feedback from "./feedback.js";
import Customer from "./customer.js";
import Order from "./order.js";
import OrderDetail from "./orderdetail.js";

// Gán model vào object db
db.User = User(sequelize, Sequelize.DataTypes);
db.Category = Category(sequelize, Sequelize.DataTypes);
db.Brand = Brand(sequelize, Sequelize.DataTypes);
db.Product = Product(sequelize, Sequelize.DataTypes);
db.Feedback = Feedback(sequelize, Sequelize.DataTypes);
db.Customer = Customer(sequelize, Sequelize.DataTypes);
db.Order = Order(sequelize, Sequelize.DataTypes);
db.OrderDetail = OrderDetail(sequelize, Sequelize.DataTypes);

// Gọi associate nếu có thiết lập quan hệ giữa các models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Gán Sequelize và instance sequelize vào db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db; // 🔥 Xuất mặc định để import đúng chuẩn ES Module
