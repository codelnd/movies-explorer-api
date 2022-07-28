const express = require('express');
const { mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.status(404).send('<h1>Страница не найдена</h1>');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
