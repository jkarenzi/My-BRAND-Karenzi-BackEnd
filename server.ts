const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config()
const commentRoutes = require('./routes/CommentRoutes')

const app = express();
app.use(express.json());

const url = process.env.MONGO_URL
const port = process.env.PORT

mongoose.connect(url)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
        });
    })
    .catch((err:any) => {
        console.log(err);
    });

app.use('/comments', commentRoutes)    