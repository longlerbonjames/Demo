import hallsService from "../service/halls.service.js";
export const createHall = async (req, res) => {
  try {
    const { cinema_id, name, capacity, screen_type = '2D', seat_map } = req.body;

    // Kiểm tra đầu vào
    if (!cinema_id || !name || !capacity || !seat_map) {
      return res.status(400).json({
        message: "cinema_id, name, capacity và seat_map là bắt buộc."
      });
    }

    const newHall = await hallsService.createHall({
      cinema_id,
      name,
      capacity,
      screen_type,
      seat_map
    });

    return res.status(201).json(newHall);
  } catch (error) {
    console.error("Error in createHall:", error);
    return res.status(500).json({ message: error.message });
  
  }
};

export const getSeatMapByHall = async (req, res) => {
  const { cinemaId, hallId } = req.params;

  try {
    const hall = await hallsService.getSeatMap(cinemaId, hallId);
    return res.json({
      hall_id: hall.hall_id,
      name: hall.name,
      seat_map: hall.seat_map
    });
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};