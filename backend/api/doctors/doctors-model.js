const db = require("../../database/db-config");

module.exports = {
  findAvailable,
};

function findAvailable() {
  return db("doctors")
    .leftJoin("appointments", "doctors.id", "appointments.doctor_id")
    .select(
      "doctors.*",
      "appointments.appointment as appointments",
      "appointments.id as appointment_id"
    )
    .whereNull("appointments.user_id")
    .then((doctors) => {
      const uniqueDoctors = {};
      doctors.map((doctor) => {
        if (uniqueDoctors[doctor.id]) {
          uniqueDoctors[doctor.id] = {
            ...uniqueDoctors[doctor.id],
            appointments: [
              ...uniqueDoctors[doctor.id].appointments,
              { time: doctor.appointments, id: doctor.appointment_id },
            ],
          };
        } else {
          uniqueDoctors[doctor.id] = {
            ...doctor,
            appointments: [
              { time: doctor.appointments, id: doctor.appointment_id },
            ],
          };
        }
      });
      return Object.keys(uniqueDoctors).map((index) => {
        const { appointment_id, ...doctor } = uniqueDoctors[index];
        return doctor;
      });
    });
}
