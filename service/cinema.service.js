import { Op } from 'sequelize';
import db from '../models/index.js';
import sequelize from '../config/database.js';
export const createCinema = async (cinemaData) => {
    const { name, address, city, contact_number, google_maps_url, opening_hours } = cinemaData;

    const query = `
    INSERT INTO cinemas (name, address, city, contact_number, google_maps_url, opening_hours)
    VALUES (:name, :address, :city, :contact_number, :google_maps_url, :opening_hours)
  `;

    const [result] = await sequelize.query(query, {
        replacements: { name, address, city, contact_number, google_maps_url, opening_hours }
    });

    return result;
};
export const updateCinema = async (id, cinemaData) => {
    const { name, address, city, contact_number, google_maps_url, opening_hours } = cinemaData;

    // Tìm cinema
    const cinemas = await sequelize.query(`
        SELECT * FROM cinemas WHERE cinema_id = :id
    `, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
    });

    if (cinemas.length === 0) {
        throw new Error('Cinema not found.');
    }

    // Update cinema
    const [result] = await sequelize.query(`
        UPDATE cinemas
        SET name = :name,
            address = :address,
            city = :city,
            contact_number = :contact_number,
            google_maps_url = :google_maps_url,
            opening_hours = :opening_hours
        WHERE cinema_id = :id
    `, {
        replacements: { id, name, address, city, contact_number, google_maps_url, opening_hours }
    });

    // Kiểm tra nếu không có hàng nào bị ảnh hưởng
    if (result === 0) {
        throw new Error('No changes made.');
    }

    // Trả về dữ liệu mới
    const updatedCinemas = await sequelize.query(`
        SELECT * FROM cinemas WHERE cinema_id = :id
    `, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
    });

    return updatedCinemas[0]; // Trả về bản ghi đầu tiên
};
export const deleteCinema = async (id) => {

    const cinemas = await sequelize.query(`
        SELECT * FROM cinemas WHERE cinema_id = :id
    `, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
    });

    if (cinemas.length === 0) {
        throw new Error('Cinema not found.');
    }

    const query = `
    DELETE FROM cinemas WHERE cinema_id = :id
  `;

    const [result] = await sequelize.query(query, {
        replacements: { id }
    });

    return result;
};

export const getCinemaById = async (id) => {
    const query = `
        SELECT * FROM cinemas WHERE cinema_id = :id
    `;

    const result = await sequelize.query(query, {
        replacements: { id },
        type: sequelize.QueryTypes.SELECT
    });

    if (result.length === 0) {
        // Nếu không tìm thấy rạp, ném lỗi
        throw new Error('Cinema not found.');
    }

    return result[0]; // Trả về bản ghi đầu tiên nếu tìm thấy
};

export const getAllCinemas = async () => {
    const query = `
    SELECT * FROM cinemas
  `;

    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    return result;
}
export default { createCinema, updateCinema, deleteCinema, getCinemaById, getAllCinemas };