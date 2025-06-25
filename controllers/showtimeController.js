import showtimeService from "../service/showtime.service.js";

export const createShowtime = async (req, res) => {
  try {
    const {
      movie_id,
      hall_id,
      start_time,
      end_time,
      base_price,
      available_seats,
      is_full = false, // mặc định false nếu không truyền
    } = req.body;

    const payload = {
      movie_id,
      hall_id,
      start_time,
      end_time,
      base_price,
      available_seats,
      is_full,
    };

    const showtime = await showtimeService.createShowtime(payload);
    res.status(201).json(showtime);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
