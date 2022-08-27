require('dotenv').config();
const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');

const { NODE_ENV, PROD_MONGO_URL } = process.env;
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./errors/errors');
const joiErrors = require('./errors/JoiErrors');
const rateLimiter = require('./utils/rateLimiter');
const { allowedCors, DEV_MONGO_URL } = require('./utils/config');

mongoose.connect(NODE_ENV === 'production' ? PROD_MONGO_URL : DEV_MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: allowedCors,
  credentials: true,
}));

app.use(router);

app.use(errorLogger);
app.use(joiErrors);
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Приложение запущено на ${PORT} порту`);
});
