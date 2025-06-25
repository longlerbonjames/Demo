import db from '../models/index.js';

const createShowtime = async ({ movie_id, hall_id, start_time, end_time, base_price }) => {
  const hall = await db.Hall.findByPk(hall_id);
  if (!hall) {
    throw new Error("Phòng chiếu không tồn tại");
  }

  const newShowtime = await db.Showtime.create({
    movie_id,
    hall_id,
    start_time,
    end_time,
    base_price,
    available_seats: hall.capacity,
    is_full: false
  });

  return newShowtime;
};


export default { createShowtime};
