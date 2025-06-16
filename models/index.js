// src/models/index.js
import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

// Khởi tạo object db
const db = {};

// Import các models
import User from "./user.js";
import Cinema from "./cinema.js";
import Hall from "./hall.js";
import Seat from "./seat.js";
import Movie from "./movie.js";
import Showtime from "./showtime.js";
import Booking from "./booking.js";
import BookingSeat from "./bookingSeat.js";
import Ticket from "./ticket.js";
import Transaction from "./transaction.js";
import Promotion from "./promotion.js";
import Review from "./review.js";
import FoodItem from "./foodItem.js";

// Khởi tạo models
db.User = User(sequelize, Sequelize.DataTypes);
db.Cinema = Cinema(sequelize, Sequelize.DataTypes);
db.Hall = Hall(sequelize, Sequelize.DataTypes);
db.Seat = Seat(sequelize, Sequelize.DataTypes);
db.Movie = Movie(sequelize, Sequelize.DataTypes);
db.Showtime = Showtime(sequelize, Sequelize.DataTypes);
db.Booking = Booking(sequelize, Sequelize.DataTypes);
db.BookingSeat = BookingSeat(sequelize, Sequelize.DataTypes);
db.Ticket = Ticket(sequelize, Sequelize.DataTypes);
db.Transaction = Transaction(sequelize, Sequelize.DataTypes);
db.Promotion = Promotion(sequelize, Sequelize.DataTypes);
db.Review = Review(sequelize, Sequelize.DataTypes);
db.FoodItem = FoodItem(sequelize, Sequelize.DataTypes);

// Gọi các associate trong từng model
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize instance
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;