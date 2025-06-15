import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getUsers = async (req, res) => {
    const users = await db.User.findAll();
    return res.status(200).json({ message: "Lấy danh sách người dùng thành công", data: users });
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin người dùng thành công", data: user });
};

export const insertUser = async (req, res) => {
    const { email, username } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await db.User.findOne({ where: { email: email.trim() } });
    if (existingUser) {
        return res.status(409).json({ message: "Email đã tồn tại" });
    }

    const newUser = await db.User.create(req.body);
    return res.status(201).json({ message: "Thêm mới người dùng thành công", data: newUser });
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    
    // Kiểm tra người dùng có tồn tại không
    const user = await db.User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    await db.User.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Cập nhật thông tin người dùng thành công" });
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    
    // Kiểm tra người dùng có tồn tại không
    const user = await db.User.findByPk(id);
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    await db.User.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá người dùng thành công" });
};
