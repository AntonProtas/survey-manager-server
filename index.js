const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');

require('dotenv').config();

const { addUser } = require('./controllers/user');

const app = new Koa();
const router = new Router();

mongoose.set('debug', true);

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Db connected'))
  .catch(err => {
    console.log(err);
  });

router.post('/sign-up', addUser);

app.use(logger());
app.use(bodyParser());
app.use(router.routes());

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
