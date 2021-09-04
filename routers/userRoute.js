const express = require('express');
const authController = require('./../controller/authController');
const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/forgotpassword',authController.forgotPassword);
router.patch('/resetpassword/:token',authController.resetPassword);
// router.get('/user/:id',userController.getUser);


module.exports = router;