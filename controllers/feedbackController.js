import { Sequelize } from "sequelize";
const { Op } = Sequelize;
import db from "../models/index.js";

export const getFeedbacks = async (req, res) => {
    const feedbacks = await db.Feedback.findAll();
    return res.status(200).json({ message: "Lấy danh sách phản hồi thành công", data: feedbacks });
};

export const getFeedbackById = async (req, res) => {
    const { id } = req.params;
    const feedback = await db.Feedback.findByPk(id);
    if (!feedback) {
        return res.status(404).json({ message: "Phản hồi không tìm thấy" });
    }
    return res.status(200).json({ message: "Lấy thông tin phản hồi thành công", data: feedback });
};

export const insertFeedback = async (req, res) => {
    const feedback = await db.Feedback.create(req.body);
    return res.status(201).json({ message: "Thêm phản hồi thành công", data: feedback });
};

export const updateFeedback = async (req, res) => {
    const { id } = req.params;
    await db.Feedback.update(req.body, { where: { id } });
    return res.status(200).json({ message: "Cập nhật phản hồi thành công" });
};

export const deleteFeedback = async (req, res) => {
    const { id } = req.params;
    await db.Feedback.destroy({ where: { id } });
    return res.status(200).json({ message: "Xoá phản hồi thành công" });
};
