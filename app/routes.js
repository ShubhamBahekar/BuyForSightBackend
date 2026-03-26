const express = require('express');
const apiRoutes = require('./controllers/v1/users/routes');
const router = express.Router();

router.use('/users', apiRoutes);

module.exports = router;