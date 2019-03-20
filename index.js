const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const router = require('./routers/index');
const cors = require('koa2-cors');
const jwt = require('jsonwebtoken');

const app = new Koa();
require('dotenv').config();

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Db connected'))
  .catch(err => {
    console.log(err);
  });


app.use(logger());
app.use(bodyParser());
app.use(cors());
app.use(router.routes());
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
