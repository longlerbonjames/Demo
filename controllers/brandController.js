import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getBrands = async (req, res) => {
    const brands = await db.Brand.findAll();
    return res.status(200).json({ message: "Lấy danh sách thương hiệu thành công", data: brands });
};

export const getBrandById = async (req, res) => {
    const { id } = req.params;
    const brand = await db.Brand.findByPk(id);
    if (!brand) {
        return res.status(404).json({ message: "Thương hiệu không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin thương hiệu thành công", data: brand });
};

export const insertBrand = async (req, res) => {
    const { name } = req.body;
    const existingBrand = await db.Brand.findOne({ where: { name: name.trim() } });

    if (existingBrand) {
        return res.status(409).json({ message: "Tên thương hiệu đã tồn tại" });
    }

    const brand = await db.Brand.create(req.body);
    return res.status(201).json({ message: "Thêm mới thương hiệu thành công", data: brand });
};

export const updateBrand = async (req, res) => {
    const { id, name } = req.body; // Lấy `id` từ body
    if (!id) {
        return res.status(400).json({ message: "Thiếu ID thương hiệu" });
    }
    await db.Brand.update({ name }, { where: { id } });
    return res.status(200).json({ message: "Cập nhật thương hiệu thành công" });
};

export const deleteBrand = async (req, res) => {
    const { id } = req.params;
    await db.Brand.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá thương hiệu thành công" });
};
