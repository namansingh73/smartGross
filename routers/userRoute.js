const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/logout',authController.logout);
router.post('/forgotpassword',authController.forgotPassword);
router.patch('/resetpassword/:token',authController.resetPassword);
router.get('/user/:id',userController.getUser);
router
    .route('/')
    .get(authController.protect,userController.getAllUsers)
    .post(userController.createUser);

module.exports = router;