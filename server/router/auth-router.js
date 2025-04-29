const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth-controllers');
const validate = require('../middlewares/validate_middleware.js');
const { signupschema, loginschema } = require('../validator/auth-validator.js');
const authMiddleware = require('../middlewares/auth-middleaware.js');

router.route('/').get(authcontroller.home);
router.route('/register').post(validate(signupschema), authcontroller.register);
router.route('/login').post(validate(loginschema), authcontroller.login);
router.route('/user').get(authMiddleware, authcontroller.user);
router.route('/afetcheduser').get(authcontroller.fetcheduser);
router.route('/adeleteuser/:userId').delete(authcontroller.deleteuser);
router.route('/aupdateuser/:userId').put(authcontroller.updateuser);

module.exports = router;
