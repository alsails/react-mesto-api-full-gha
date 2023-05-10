const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
require('dotenv').config();

const { PORT, limiter } = require('./utils/config');
const handelError = require('./error/HandleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
mongoose
  .connect('mongodb://127.0.0.1/mestodb');

// eslint-disable-next-line consistent-return
app.use(cors({
  origin: [
    'http://localhost:3001',
    'http://127.0.0.1',
    'http://mesto.for.photos.nomoredomains.monster',
    'https://mesto.for.photos.nomoredomains.monster',
  ],
  credentials: true,
  exposedHeaders: ['set-cookie'],
}));

app.use(cookieParser());
app.use(limiter);
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use(errorLogger);
app.use(errors());

app.use(handelError);

app.listen(PORT);
