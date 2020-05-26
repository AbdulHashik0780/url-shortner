const express = require('express');
const app = express();

const {PORT} = require('./config');
const db = require('./db');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes'));

app.listen(PORT);