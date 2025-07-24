const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/login', authRoutes);
app.use('/items', todoRoutes);

module.exports = app;