const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {APP_PORT, DB_URL} = require('./config');
const routes = require('./routes');
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler')
// const color = require("cli-color");

mongoose.connect(DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(cors({
  origin: 'http://localhost:3000', // Allow this origin to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowable methods
  credentials: true // Allow credentials (cookies, authorization headers, etc.)
}));
app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.use('/uploads', express.static('uploads'));

app.listen(APP_PORT,()=>{
  console.log(`app running on the ${APP_PORT}`);
});
