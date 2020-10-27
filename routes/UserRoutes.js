const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const middleware = require('../middleware/middleware');



router.get('/login', function (req, res, next) {
    res.render('user/login',{isUserLoggedIn:false})
});
router.get('/signup', function (req, res, next) {
    res.render('user/signup',{isUserLoggedIn:false})
})
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/logout', function(req, res){
    res.clearCookie('x-access-token')
    res.clearCookie('userid')
    res.redirect('/login');
  });

module.exports = router;