const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');

router.post('/cart',cartController.addCart);
router.post('/clearCart',cartController.clearCart);
router.post('/cartSaveChanges',cartController.cartSaveChanges);
router.post('/addAllInCart',cartController.addAllFromSmart);
router.post('/cartSmart',cartController.addSmart);

module.exports = router;