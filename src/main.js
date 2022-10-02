const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();
const apiRouter = require('./routers/api-router/index')

const { SERVER_DOMAIN, SERVER_PROTOCOL, SERVER_PORT, DB_CONNECTION } = process.env;
const constantsInEnvFile = SERVER_DOMAIN && SERVER_PROTOCOL && SERVER_PORT && DB_CONNECTION;


try {
  if (!constantsInEnvFile) {
    throw new Error('Define project constants in .env file before starting...')
  };

  server.use(express.json());
  server.use(morgan('tiny'));
  server.use(cors());
  server.use(express.static('public'));

  server.use('/api', apiRouter);

  mongoose.connect(DB_CONNECTION, (err) => {
    if (err) {
      throw err.message
    };

    console.log('Connected to MongoDB Atlas.');

    server.listen(SERVER_PORT, (err) => {
      if (err) {
        console.error(err);
      };

      console.log(`Server running on ${SERVER_PROTOCOL}://${SERVER_DOMAIN}:${SERVER_PORT}`)
    });
  });

} catch (err) {
  console.error(err.message)
};
