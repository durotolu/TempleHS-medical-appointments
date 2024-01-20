const db = require("../../database/db-config");

module.exports = {
  // find,
  // findById,
  update,
  // findByEmail,
};

// function find() {
//   return db("users").select("id", "email", "date_of_birth", "password");
// }

// async function findById(id) {
function findById(id) {
  return db("appointments")
    .leftJoin("users", "users.id", "appointments.user_id")
    .where("appointments.id", id)
    .select(
      "users.email",
      "users.date_of_birth",
      "users.id as user_id",
      "appointments.id",
      "appointments.type",
      "appointments.appointment"
    );
}

async function add(appointment) {
  const [id] = await db("appointments").update(appointment, "id");

  return id;
  // return findBy(id);
}

function update(id, changes) {
  return db("appointments")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}

function findDoctorById(id) {
  return db("doctors").where("id", id);
}

function findUserById(id) {
  return db("users")
    .leftJoin("appointments", "users.id", "appointments.user_id")
    .where("users.id", id)
    .select(
      "users.email",
      "appointments.id as appointment_id",
      "appointments.type",
      "appointments.doctor_id",
      "appointments.appointment"
    );
}
