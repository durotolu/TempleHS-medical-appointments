/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("doctors").del();
  await knex("doctors").insert([
    {
      id: 1,
      name: "Leo Stanton",
      title: "MD",
      bio: "Dr. Leo Nieto is a board certified Internist with a broad experience treating both complex and simple medical conditions. He has been practicing for more than 10 years. He graduated from Tufts Univ...",
      in_person: false,
      photo: "",
    },
    {
      id: 2,
      name: "Marcelino Kindred",
      title: "MD",
      bio: "Dr. Marcelino is a board-certified Internal Medicine physician based in San Diego, CA. He received his Doctor of Osteopathic Medicine degree from Western University/COMP in Pomona, CA and completed...",
      in_person: true,
      photo: "",
    },
    {
      id: 3,
      name: "Pat Alexander",
      title: "DO",
      bio: "Dr. Pat Nieto is a Family Practice physician with Doctor on Demand. Dr. Mattis received her undergraduate degree from Smith College in 2004, and her medical degree from Columbia University in 2008...",
      in_person: false,
      photo: "",
    },
    {
      id: 4,
      name: "Audrey Simmmons",
      title: "MD",
      bio: "Dr. Audrey is a board certified Internist with a broad experience treating both complex and simple medical conditions. He has been practicing for more than 10 years. He graduated from Tufts Univ...",
      in_person: true,
      photo: "",
    },
  ]);
};
