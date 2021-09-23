const express = require('express');
const viewcontroller = require('../controller/viewcontroller');
const authController = require('../controller/authController');
const router = express.Router();

router.get('/login',viewcontroller.loginPage);
router.get('/signup',viewcontroller.signupPage);
router.get('/',authController.isLoggedIn,viewcontroller.home);
router.get('/home',authController.isLoggedIn,viewcontroller.smartBag);
router.get('/cart',authController.isLoggedIn,viewcontroller.cart);
router.get('/aboutUs',authController.isLoggedIn,viewcontroller.about);
//router.get('/',authController.isLoggedIn,authController.reDirect);
// router.get('/login',viewcontroller.getLoginForm);
// router.get('/signup',viewcontroller.signupform);
// router.get('/mainpage',authController.isLoggedIn,viewcontroller.mainPage);
router.get('/forgotpassword',viewcontroller.forgotPassword);
router.get('/resetpassword/:token',viewcontroller.resetPassword);
// router.get('/profile',authController.isLoggedIn,viewcontroller.showProfile);
// router.get('/profile/:userId',authController.isLoggedIn,postController.findOthersProfile,viewcontroller.showOthers);

module.exports = router;