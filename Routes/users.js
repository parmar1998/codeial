const express = require('express');
const router = express.Router();

const passport = require('passport');

const usercontroller = require('../Controllers/users_controller');

router.get('/profile/:id', passport.checkAuthentication, usercontroller.profile);
router.post('/update/:id', passport.checkAuthentication, usercontroller.update);
router.get('/sign-up', usercontroller.signUp);
router.get('/sign-In', usercontroller.signIn);
router.post('/create', usercontroller.create);

//using passport here as middleware to authenticate
router.post('/createSession',
    passport.authenticate('local', { failureRedirect: '/users/sign-In' },
    ), usercontroller.createSession);
router.get('/sign-out', usercontroller.destroySession);

module.exports = router;