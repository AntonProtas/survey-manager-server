const Koa = require('koa');
const Router = require('koa-router');
const { addUser, authUser } = require('./controllers/user');
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
const logger = require('koa-logger');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const router = new Router();
const app = new Koa();
const fs = require('fs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
require('dotenv').config();

router.post('/sign-up', addUser);
router.post('/sign-in', authUser);
router.post('/save-survey', checkAuth, saveSurvey);
router.delete('/delete-survey', checkAuth, deleteSurvey);
router.get('/get-surveys', checkAuth, getSurveys);
router.get('/get-survey-by-id', checkAuth, getSurveyById);
router.get('/get-survey-results', checkAuth, getSurveyResults);
router.post('/save-survey-result', saveSurveyResult);

router.get('/get-users-data', checkAdmin, getUsersData);

router.post('/change-user-name', checkAdmin, changeUserName);
router.post('/change-user-email', checkAdmin, changeUserEmail);
router.post('/delete-user', checkAdmin, deleteUser);
router.post('/change-user-role', checkAdmin, changeUserRole);

const User = require('./models/user');

router.get('/get-data-json', async ctx => {
  const users = await User.find({}).sort('registrationDate');
  console.log(JSON.stringify(users, null, 4));
  fs.writeFile('users-data.json', JSON.stringify(users, null, 4), function(
    err
  ) {
    if (err) throw err;
    console.log('The "data to append" was appended to file!');
  });
  ctx.body = {
    message: 'all ok'
  };

  ctx.status = 200;
});

router.get('/get-data-docx', async ctx => {
  const users = await User.find({}).sort('registrationDate');
  const doc = new Document();

  users.map(user => {
    const paragraph1 = new Paragraph(`id - ${user._id} `);
    doc.addParagraph(paragraph1);
    const paragraph2 = new Paragraph(`username - ${user.username} `);
    doc.addParagraph(paragraph2);
    const paragraph3 = new Paragraph(`email - ${user.email} `);
    doc.addParagraph(paragraph3);
    const paragraph4 = new Paragraph(`password - ${user.password} `);
    doc.addParagraph(paragraph4);
    const paragraph5 = new Paragraph(`role - ${user.role} `);
    doc.addParagraph(paragraph5);
    const paragraph6 = new Paragraph(
      `registrationDate - ${user.registrationDate} `
    );
    doc.addParagraph(paragraph6);
    const paragraph7 = new Paragraph(`---------------------------- `);
    doc.addParagraph(paragraph7);
  });

  const packer = new Packer();
  packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('users-data.docx', buffer);
  });

  ctx.status = 200;
});

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
app.use(handleApiError);
app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
