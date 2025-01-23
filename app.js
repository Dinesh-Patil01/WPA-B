const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

module.exports = app;