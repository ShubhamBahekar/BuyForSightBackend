const express = require('express');
const {PORT} = require('./configuration/config');
const apiRoutes = require('./app/routes');
const customResponses = require('./app/helpers/customResponses');

const app = express();

app.use(express.json());
app.use(customResponses);
app.use(apiRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});