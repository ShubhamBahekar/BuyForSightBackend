const fs = require("fs").promises;
const path = require("path");

const { DATA_FOLDER } = require("../../configuration/config");

const DATA_PATH = path.join(DATA_FOLDER, "data.json");

const readUsers = async () => {
  const data = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(data);
};

const writeUsers = async (users) => {
  await fs.writeFile(DATA_PATH, JSON.stringify(users, null, 2));
};

module.exports = {
    readUsers,
    writeUsers
}