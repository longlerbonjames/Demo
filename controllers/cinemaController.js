import cinemaService from "../service/cinema.service.js";

// Thêm rạp
export const createCinema = async (req, res) => {
    try {
        const { name, address, city, contact_number, google_maps_url, opening_hours } = req.body;

        // Validate các trường bắt buộc
        if (!name || !address || !city) {
            return res.status(400).json({ message: 'Name, address, and city are required.' });
        }

        // Nếu hợp lệ thì gọi service
        const result = await cinemaService.createCinema({
            name,
            address,
            city,
            contact_number,
            google_maps_url,
            opening_hours
        });

        return res.status(201).json({ message: 'Cinema created successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, city, contact_number, google_maps_url, opening_hours } = req.body;

        const result = await cinemaService.updateCinema(id, {
            name,
            address,
            city,
            contact_number,
            google_maps_url,
            opening_hours
        });
        return res.json({ message: 'Cinema updated successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Xoá rạp
export const deleteCinema = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await cinemaService.deleteCinema(id,);
        return res.json({ message: 'Cinema deleted successfully', data: result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getCinemaById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await cinemaService.getCinemaById(id);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getAllCinemas = async (req, res) => {
    try {
        const result = await cinemaService.getAllCinemas();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
