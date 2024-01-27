/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("appointments").del();
  await knex("appointments").insert([
    {
      id: 1,
      appointment: new Date(
        new Date().getTime() + 12 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 1,
    },
    {
      id: 2,
      appointment: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 1,
    },
    {
      id: 3,
      appointment: new Date(
        new Date().getTime() + 48 * 50 * 60 * 1000
      ).toISOString(),
      doctor_id: 1,
    },
    {
      id: 4,
      appointment: new Date(
        new Date().getTime() + 6 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 2,
    },
    {
      id: 5,
      appointment: new Date(
        new Date().getTime() + 10 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 2,
    },
    {
      id: 6,
      appointment: new Date(
        new Date().getTime() + 30 * 50 * 60 * 1000
      ).toISOString(),
      doctor_id: 2,
    },
    {
      id: 7,
      appointment: new Date(
        new Date().getTime() + 50 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 2,
    },
    {
      id: 8,
      appointment: new Date(
        new Date().getTime() + 7 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 3,
    },
    {
      id: 9,
      appointment: new Date(
        new Date().getTime() + 17 * 50 * 60 * 1000
      ).toISOString(),
      doctor_id: 3,
    },
    {
      id: 10,
      appointment: new Date(
        new Date().getTime() + 12 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
    {
      id: 11,
      appointment: new Date(
        new Date().getTime() + 14 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
    {
      id: 12,
      appointment: new Date(
        new Date().getTime() + 24 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
    {
      id: 13,
      appointment: new Date(
        new Date().getTime() + 30 * 50 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
    {
      id: 14,
      appointment: new Date(
        new Date().getTime() + 58 * 50 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
    {
      id: 15,
      appointment: new Date(
        new Date().getTime() + 78 * 60 * 60 * 1000
      ).toISOString(),
      doctor_id: 4,
    },
  ]);
};
