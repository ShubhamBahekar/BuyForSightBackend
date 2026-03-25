const express = require('express');
const apiRoutes = require('./controllers/v1/routes');
const router = express.Router();

router.use('/v1', apiRoutes);

module.exports = router;