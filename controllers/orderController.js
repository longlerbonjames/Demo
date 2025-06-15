import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getOrders = async (req, res) => {
    const orders = await db.Order.findAll();
    return res.status(200).json({ message: "Lấy danh sách đơn hàng thành công", data: orders });
};

export const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await db.Order.findByPk(id);
    if (!order) {
        return res.status(404).json({ message: "Đơn hàng không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin đơn hàng thành công", data: order });
};

export const insertOrder = async (req, res) => {
    const order = await db.Order.create(req.body);
    return res.status(201).json({ message: "Thêm đơn hàng thành công", data: order });
};

export const insertFullDetailOrder = async (req, res) => {
    const t = await db.sequelize.transaction(); // Bắt đầu transaction
    try {
        const { userId, customerId, status, note, totalPrice, orderDetails } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!customerId || !status || !totalPrice || !orderDetails || orderDetails.length === 0) {
            return res.status(400).json({ message: "Dữ liệu đơn hàng không hợp lệ." });
        }

        // Tạo đơn hàng
        const newOrder = await db.Order.create({
            user_id: userId || null, // User có thể null
            customer_id: customerId,
            status,
            note: note || null, // Note có thể null
            total_price: totalPrice
        }, { transaction: t });

        if (!newOrder || !newOrder.id) {
            throw new Error("Không thể tạo đơn hàng.");
        }

        // Tạo danh sách chi tiết đơn hàng
        const orderDetailEntries = orderDetails.map((item) => ({
            order_id: newOrder.id,
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price
        }));

        await db.OrderDetail.bulkCreate(orderDetailEntries, { transaction: t });

        await t.commit(); // Xác nhận transaction

        return res.status(201).json({
            message: "Thêm đơn hàng đầy đủ thành công",
            order: newOrder,
            orderDetails: orderDetailEntries
        });

    } catch (error) {
        await t.rollback(); // Hoàn tác transaction khi có lỗi
        console.error("Chi tiết lỗi:", error);
        return res.status(500).json({ message: "Lỗi khi thêm đơn hàng đầy đủ", error: error.message, stack: error.stack });
    }
};

export const getOrderWithCustomer = async (req, res) => {
    try {
        // Lấy tất cả đơn hàng kèm thông tin khách hàng
        const orders = await db.Order.findAll({
            include: [
                {
                    model: db.Customer, // Join với bảng customers
                    as: "customer" // Đảm bảo alias khớp với định nghĩa trong model
                }
            ]
        });

        // Kiểm tra nếu không có đơn hàng nào
        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Không có đơn hàng nào" });
        }

        // Trả về danh sách đơn hàng kèm thông tin khách hàng
        return res.status(200).json({
            message: "Lấy thông tin đơn hàng và khách hàng thành công",
            data: orders
        });

    } catch (error) {
        console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        return res.status(500).json({ message: "Lỗi server", error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    const { id } = req.params;
    await db.Order.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Cập nhật đơn hàng thành công" });
};

export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    await db.Order.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá đơn hàng thành công" });
};
