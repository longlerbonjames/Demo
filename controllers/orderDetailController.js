import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getOrderDetails = async (req, res) => {
    const orderDetails = await db.OrderDetail.findAll();
    return res.status(200).json({ message: "Lấy danh sách chi tiết đơn hàng thành công", data: orderDetails });
};

export const getOrderDetailById = async (req, res) => {
    const { id } = req.params;
    const orderDetail = await db.OrderDetail.findByPk(id);
    if (!orderDetail) {
        return res.status(404).json({ message: "Chi tiết đơn hàng không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin chi tiết đơn hàng thành công", data: orderDetail });
};

export const insertOrderDetail = async (req, res) => {
    const orderDetail = await db.OrderDetail.create(req.body);
    return res.status(201).json({ message: "Thêm chi tiết đơn hàng thành công", data: orderDetail });
};

export const updateOrderDetail = async (req, res) => {
    const { id } = req.params;
    await db.OrderDetail.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Cập nhật chi tiết đơn hàng thành công" });
};

export const deleteOrderDetail = async (req, res) => {
    const { id } = req.params;
    await db.OrderDetail.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá chi tiết đơn hàng thành công" });
};

export const getOrderDetailsByOrderId = async (req, res) => {
    const { orderId } = req.params; // Lấy orderId từ URL

    try {
        // Lấy thông tin chi tiết đơn hàng kèm thông tin sản phẩm
        const orderDetails = await db.OrderDetail.findAll({
            where: { order_id: orderId }, // Lọc theo orderId
            include: [
                {
                    model: db.Product, // Join với bảng products
                    as: "product" // Đảm bảo alias khớp với định nghĩa trong model
                }
            ]
        });

        // Kiểm tra nếu không có chi tiết đơn hàng nào
        if (!orderDetails || orderDetails.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy chi tiết đơn hàng" });
        }

        // Trả về thông tin chi tiết đơn hàng
        return res.status(200).json({
            message: "Lấy thông tin chi tiết đơn hàng thành công",
            data: orderDetails
        });

    } catch (error) {
        console.error("Lỗi khi lấy thông tin chi tiết đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};