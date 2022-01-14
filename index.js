require('dotenv').config();
const express = require('express');
const app = express();
var cors = require('cors')

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);

const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
})

db.once('open', () => {
    console.log('connected to Database');
})


app.listen(process.env.PORT, () => {
    console.log("server started at 3000");
});


const carRoutes = require('./routes/carRouter.js');
app.use(express.json());
app.use(cors());
app.use(
    '/api/v0/cars/',
    carRoutes
);
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);