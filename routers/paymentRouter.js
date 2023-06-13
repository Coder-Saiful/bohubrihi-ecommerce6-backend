const { initPayment, ipn, paymentSuccess, paymentCancel, paymentFail } = require('../controllers/paymentController');
const authorize = require('../middlewares/authorize');
const router = require('express').Router();

router.route('/')
    .get(authorize, initPayment);

router.post('/ipn');

// router.post('/success', paymentSuccess);

// router.post('/cancel', paymentCancel);

// router.post('/fail', paymentFail);

module.exports = router;
