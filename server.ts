const express = require('express')
const mongoose = require("mongoose")
require('dotenv').config()
const blogRoutes = require('./routes/BlogRoutes')
const commentRoutes = require('./routes/CommentRoutes')
const queryRoutes = require('./routes/QueryRoutes')
const usermgtRoutes = require('./routes/UserMgtRoutes')
const authRoutes = require('./routes/AuthRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerconfig');
const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

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


app.use('/blogs', blogRoutes)    
app.use('/comments', commentRoutes)    
app.use('/queries', queryRoutes)    
app.use('/usermgt', usermgtRoutes)
app.use('/auth', authRoutes);