// import express from "express";
// import cors from "cors";  // Import thư viện CORS
// import db from "./models/index.js"; 
// import routes from "./routes/routes.js";

// const app = express();

// // Sử dụng CORS middleware
// app.use(cors({
//     origin: "http://localhost:5173", // Cho phép frontend truy cập
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization"
// }));

// app.use(express.json());
// app.use("/api", routes);

// const PORT = process.env.PORT || 5000;
// db.sequelize.sync().then(() => {
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// });

import express from "express";
import cors from "cors";  // Import thư viện CORS
import path from "path";  // Import path để xử lý đường dẫn
import db from "./models/index.js"; 
import routes from "./routes/routes.js";

const app = express();

// 📌 Cấu hình CORS
app.use(cors({
    origin: "http://localhost:5173", // Cho phép frontend truy cập
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// 📌 Cấu hình để phục vụ ảnh tĩnh
const imagePath = path.join(process.cwd(), "wwwroot/images");
app.use("/images", express.static(imagePath));

console.log(`Serving images from: ${imagePath}`); // Debug đường dẫn

// 📌 Sử dụng routes API
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
