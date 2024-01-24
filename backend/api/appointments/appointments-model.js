const db = require("../../database/db-config");

module.exports = {
  update,
};
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

function update(id, changes) {
  return db("appointments")
    .where("id", id)
    .update(changes)
    .then((count) => (count > 0 ? findById(id) : null));
}
