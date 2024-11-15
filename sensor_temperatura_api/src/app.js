const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const requestLogger = require('./middlewares/requestLogger');
const sensorRoutes = require('./api/v1/routes/sensorRoutes');
const docRoutes = require('./api/v1/routes/docRoutes');

const app = express();

app.use(bodyParser.json());
app.use(requestLogger);

// API v1 routes
app.use('/api/v1/sensor', sensorRoutes);
app.use('/api/v1/docs', docRoutes);

app.use(errorHandler);

module.exports = app;