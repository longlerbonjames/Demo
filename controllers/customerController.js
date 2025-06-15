import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getCustomers = async (req, res) => {
    const customers = await db.Customer.findAll();
    return res.status(200).json({ message: "Lấy danh sách khách hàng thành công", data: customers });
};

export const getCustomerById = async (req, res) => {
    const { id } = req.params;
    const customer = await db.Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({ message: "Khách hàng không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin khách hàng thành công", data: customer });
};

export const insertCustomer = async (req, res) => {
    const { email, username } = req.body;

    // Kiểm tra email đã tồn tại chưa
    const existingCustomer = await db.Customer.findOne({ where: { email: email.trim() } });
    if (existingCustomer) {
        return res.status(409).json({ message: "Email khách hàng đã tồn tại" });
    }

    const newCustomer = await db.Customer.create(req.body);
    return res.status(201).json({ message: "Thêm mới khách hàng thành công", data: newCustomer });
};

export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    
    // Kiểm tra khách hàng có tồn tại không
    const customer = await db.Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    await db.Customer.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Cập nhật thông tin khách hàng thành công" });
};

export const deleteCustomer = async (req, res) => {
    const { id } = req.params;
    
    // Kiểm tra khách hàng có tồn tại không
    const customer = await db.Customer.findByPk(id);
    if (!customer) {
        return res.status(404).json({ message: "Khách hàng không tồn tại" });
    }

    await db.Customer.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá khách hàng thành công" });
};
