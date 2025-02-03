const express = require('express');
const app = express();
const connectDB = require('./db');
require('dotenv').config();

const applicationRoute = require('./routes/applicationRoute');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.json()); 
app.use('/api', applicationRoute);
connectDB();

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


