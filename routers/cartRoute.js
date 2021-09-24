const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const authController = require('../controller/authController');

router.post('/cart',authController.isLoggedIn,cartController.addCart);
router.post('/clearCart',authController.isLoggedIn,cartController.clearCart);
router.post('/cartSaveChanges',authController.isLoggedIn,cartController.cartSaveChanges);
router.post('/addAllInCart',authController.isLoggedIn,cartController.addAllFromSmart);
router.post('/cartSmart',authController.isLoggedIn,cartController.addSmart);

module.exports = router;