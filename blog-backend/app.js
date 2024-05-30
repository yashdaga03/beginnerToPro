const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const blogRoute = require('./src/route/blogRoute')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", blogRoute);

module.exports = app;