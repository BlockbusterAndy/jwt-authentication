const router = require('express').Router();
const { login, register } = require('../Controllers/AuthControllers');
const { checkUser } = require("../Middlewares/AuthMiddlewares");



router.post('/register', register);
router.post('/login', login);
router.post('/', checkUser);


module.exports = router;