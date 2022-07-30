require('dotenv').config();
const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { serverError } = require('./errors/errors');
const joiErrors = require('./errors/JoiErrors');
const rateLimiter = require('./utils/rateLimiter');
const { allowedCors } = require('./utils/config');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(router);

app.use(errorLogger);
app.use(joiErrors);
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
