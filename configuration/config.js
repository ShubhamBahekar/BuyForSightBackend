const env = require('dotenv');
env.config();

module.exports = {
    PORT: process.env.PORT,
    DATA_FOLDER: process.env.DATA_FOLDER
}