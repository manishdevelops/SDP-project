const express = require('express');
const app = express();
const userRoute = require('./routes/userRoutes');

app.use(express.json());
app.use('/api/users/', userRoute);

module.exports = app;