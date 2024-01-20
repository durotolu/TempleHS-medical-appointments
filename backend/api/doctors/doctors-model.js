const db = require("../../database/db-config");

module.exports = {
  findAvailable,
  // findById,
  // add,
  // findByEmail,
};

function findAvailable() {
  return db("doctors")
    .leftJoin("appointments", "doctors.id", "appointments.doctor_id")
    // .select("id", "name", "title", "bio", "in_person", "photo")
    .select(
      "doctors.*",
      "appointments.appointment",
      "appointments.id as appointment_id"
    )
    .whereNull("appointments.user_id")
    // .groupBy('doctors.id')
    // .first()
    // .then((parks) => parks.map((park) => mappers.parkPropertyToBoolean(park)));
}

// function findById(id) {
//   return db("users").where({ id }).first();
// }

// async function add(user) {
//   const [id] = await db("users").insert(user, "id");

//   return findById(id);
// }

// function findByEmail(email) {
//   return db("users").where({ email }).first();
// }
