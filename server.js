import express from "express";
import cors from "cors";
import path from "path";
import swaggerUi from "swagger-ui-express";
import db from "./models/index.js";
import routes from "./routes/routes.js";
import fs from 'fs';

const swaggerFile = JSON.parse(fs.readFileSync('./swagger-output.json', 'utf-8'));
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

const imagePath = path.join(process.cwd(), "wwwroot/images");
app.use("/images", express.static(imagePath));

console.log(`Serving images from: ${imagePath}`);

app.use("/api", routes);

// ✅ Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger UI available at: http://localhost:${PORT}/api-docs`);
        
    });
});
 