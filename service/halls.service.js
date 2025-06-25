import db from '../models/index.js';

export const createHall = async (data) => {
  const { cinema_id, name, capacity, screen_type, seat_map } = data;

  const hall = await db.Hall.create({
    cinema_id,
    name,
    capacity,
    screen_type,
    seat_map
  });

  return hall;
};
const getSeatMap = async (cinemaId, hallId) => {
  const hall = await db.Hall.findOne({
    where: {
      cinema_id: cinemaId,
      hall_id: hallId
    },
    attributes: ['hall_id', 'name', 'seat_map']
  });

  if (!hall) {
    throw new Error('Hall not found for this cinema');
  }

  return hall;
};




export default { createHall,getSeatMap };
