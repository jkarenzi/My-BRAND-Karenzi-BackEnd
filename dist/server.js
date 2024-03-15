"use strict";
const express = require('express');
const mongoose = require("mongoose");
require('dotenv').config();
const queryRoutes = require('./routes/QueryRoutes');
const app = express();
app.use(express.json());
const url = process.env.MONGO_URL;
const port = process.env.PORT;
mongoose.connect(url)
    .then(() => {
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
app.use('/queries', queryRoutes);