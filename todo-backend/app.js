const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const userRoutes = require('./src/route/userRoutes')
const todoRoutes = require('./src/route/todoRoutes')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

module.exports = app;