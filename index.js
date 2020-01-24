const { addUser, authUser, setProfileImage } = require('./controllers/user');
const {
  getUsersData,
  changeUserName,
  changeUserEmail,
  deleteUser,
  changeUserRole
} = require('./controllers/users');
const {
  saveSurvey,
  getSurveys,
  getSurveyById,
  saveSurveyResult,
  getSurveyResults,
  deleteSurvey
} = require('./controllers/survey');
const { handleApiError } = require('./ER/errorHandler');
const { checkAuth } = require('./middleware/checkAuth');
const { checkAdmin } = require('./middleware/checkAdmin');
const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const cors = require('koa2-cors');
const router = new Router();
const app = new Koa();
require('dotenv').config();

router.post('/sign-up', addUser);
router.post('/sign-in', authUser);
router.post('/save-survey', checkAuth, saveSurvey);
router.delete('/delete-survey', checkAuth, deleteSurvey);
router.get('/get-surveys', checkAuth, getSurveys);
router.get('/get-survey-by-id', getSurveyById);
router.get('/get-survey-results', checkAuth, getSurveyResults);
router.post('/save-survey-result', saveSurveyResult);
router.get('/get-users-data', checkAdmin, getUsersData);
router.post('/change-user-name', checkAdmin, changeUserName);
router.post('/change-user-email', checkAdmin, changeUserEmail);
router.post('/delete-user', checkAdmin, deleteUser);
router.post('/change-user-role', checkAdmin, changeUserRole);
router.post('/set-profile-image', setProfileImage);

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log('Db connected'))
  .catch(err => {
    console.log(err);
  });

app.use(logger());
app.use(koaBody({ multipart: true }));
app.use(cors());
app.use(router.routes());
app.on('error', handleApiError);
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
