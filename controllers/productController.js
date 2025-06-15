import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";

// 📌 Lấy đường dẫn thư mục hiện tại (ES Module)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📌 Cấu hình thư mục lưu trữ ảnh
const uploadDir = path.join(__dirname, "../wwwroot/images");

// 📌 Tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// 📌 Cấu hình Multer để lưu file vào thư mục
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

// 📌 Khởi tạo Multer
const upload = multer({ storage: storage });

// 📌 Middleware Multer để xử lý upload file
export const uploadMiddleware = upload.single("image");

export const getProducts = async (req, res) => {
    const products = await db.Product.findAll();
    return res.status(200).json({ message: "Lấy danh sách sản phẩm thành công", data: products });
};

export const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await db.Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin sản phẩm thành công", data: product });
};

export const getProductByCategoryId = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const products = await db.Product.findAll({
            where: { category_id: categoryId }  // Giả sử category_id là khóa ngoại trong bảng Product
        });

        if (products.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm nào cho danh mục này" });
        }

        return res.status(200).json({ message: "Lấy danh sách sản phẩm theo danh mục thành công", data: products });
    } catch (error) {
        console.error("Lỗi khi lấy sản phẩm theo danh mục:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};


export const insertProduct = async (req, res) => {
    const product = await db.Product.create(req.body);
    return res.status(201).json({ message: "Thêm sản phẩm thành công", data: product });
};

// export const updateProduct = async (req, res) => {
//     const { id } = req.params;
//     await db.Product.update(req.body, { where: { id } });
//     return res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
// };

export const updateProduct = async (req, res) => {
    const { id, name, price, quantity, category_id, brand_id, image } = req.body; // Lấy `id` từ body
    if (!id) {
        return res.status(400).json({ message: "Thiếu ID sản phẩm" });
    }
    await db.Product.update({ name, price, quantity, category_id, brand_id, image }, { where: { id } });
    return res.status(200).json({ message: "Cập nhật sản phẩm thành công" });
};



export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await db.Product.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá sản phẩm thành công" });
};


// 📌 API: Upload ảnh sản phẩm
export const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Không có ảnh nào được tải lên" });
        }

        // Tạo URL truy cập ảnh
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

        return res.status(200).json({ message: "Tải ảnh lên thành công", imageUrl });
    } catch (error) {
        return res.status(500).json({ message: "Lỗi server", error });
    }
};