const Koa = require('koa');
const Router = require('koa-router');
const { addUser, authUser } = require('./controllers/user');
const {
  saveSurvey,
  getSurveys,
  getSurveyById,
  saveSurveyResult,
  getSurveyResults,
  deleteSurvey
} = require('./controllers/survey');
const jwtMiddleware = require('koa-jwt');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = new Router();
const app = new Koa();
require('dotenv').config();

router.post('/sign-up', addUser);
router.post('/sign-in', authUser);
router.post('/save-survey',checkAuth, saveSurvey);
router.delete('/delete-survey', deleteSurvey);
router.get('/get-surveys', getSurveys);
router.get('/get-survey-by-id', getSurveyById);
router.get('/get-survey-results', getSurveyResults);
router.post('/save-survey-result', saveSurveyResult);
router.use(
  jwtMiddleware({
    secret: process.env.SECRET
  })
);

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
