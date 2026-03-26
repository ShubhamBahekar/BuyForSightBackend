const env = require('dotenv');
env.config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DATA_FOLDER: process.env.DATA_FOLDER || '.'
}