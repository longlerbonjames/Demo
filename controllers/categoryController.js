import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getCategories = async (req, res) => {
    const categories = await db.Category.findAll();
    return res.status(200).json({ message: "Lấy danh sách danh mục thành công", data: categories });
};

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    const category = await db.Category.findByPk(id);
    if (!category) {
        return res.status(404).json({ message: "Danh mục không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin danh mục thành công", data: category });
};

export const insertCategory = async (req, res) => {
    const category = await db.Category.create(req.body);
    return res.status(201).json({ message: "Thêm mới danh mục thành công", data: category });
};

export const updateCategory = async (req, res) => {
    const { id, name } = req.body; // Lấy `id` từ body
    if (!id) {
        return res.status(400).json({ message: "Thiếu ID danh mục" });
    }
    await db.Category.update({ name }, { where: { id } });
    return res.status(200).json({ message: "Cập nhật danh mục thành công" });
};


export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await db.Category.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá danh mục thành công" });
};
