const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');

require('colors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const start = async() => {
    try {
        await sequelize.authenticate().then(console.log('Connect to DB successful'.bgMagenta));
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server has started on port ${PORT}`.bgCyan));
    } catch(err) {
        console.log('Error with connection to DB'.bgRed, err);
    }
}

start();