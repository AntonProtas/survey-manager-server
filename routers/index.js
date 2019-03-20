const Router = require('koa-router');
const { addUser } = require('../controllers/user');
const { checkUser } = require('../controllers/user');
const jwtMiddleware = require('koa-jwt');

const router = new Router();

router.post('/sign-up', addUser);
router.post('/sign-in', checkUser);
router.use(
  jwtMiddleware({
    secret: process.env.SECRET
  })
);

module.exports = router;
