const express = require('express');
const defaultController = require('../controllers/defaultController');
const payment = require('../controllers/admin/payment');
const paymentMethod = require('../controllers/admin/paymentMethod');
const rental = require('../controllers/admin/rental');
const session = require('../controllers/app/session');

const router = express.Router();

// All users require a logged user with administrator permissions.
router.use(session.loginRequired, session.adminRequired);

// Autoload for routes using :param
router.param(
	'paymentMethodId',
	defaultController.load(paymentMethod.model, paymentMethod.loadOptions),
);
// Routes for the model paymentMethod
router.get(
	'/paymentMethods',
	paymentMethod.setDefaults, defaultController.index,
);
router.get(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.show,
);
router.post(
	'/paymentMethod',
	paymentMethod.create, defaultController.create,
);
router.put(
	'/paymentMethod/:paymentMethodId(\\d+)',
	paymentMethod.update, defaultController.update,
);
router.delete(
	'/paymentMethod/:paymentMethodId(\\d+)',
	defaultController.destroy,
);

// Autoload for routes using :param
router.param(
	'paymentId',
	defaultController.load(payment.model, payment.loadOptions),
);

// Routes for the model payment
router.get(
	'/payments',
	payment.index, defaultController.index,
);
router.get(
	'/payment/:paymentId(\\d+)',
	defaultController.show,
);
router.post(
	'/payment',
	payment.create, defaultController.create,
);
router.put(
	'/payment/:paymentId(\\d+)',
	payment.update, defaultController.update,
);
router.delete(
	'/payment/:paymentId(\\d+)',
	defaultController.destroy,
);

router.param(
	'rentalId',
	defaultController.load(rental.model, rental.loadOptions),
);

// Routes for the model rental
router.get(
	'/rentals',
	rental.index, defaultController.index,
);
router.get(
	'/rental/:rentalId(\\d+)',
	defaultController.show,
);

router.post(
	'/rental',
	rental.create, defaultController.create,
);
router.put(
	'/rental/:rentalId(\\d+)',
	rental.update, defaultController.update,
);
router.delete(
	'/rental/:rentalId(\\d+)',
	defaultController.destroy,
);

// Routes for actions

router.post(
	'/rental/:rentalId(\\d+)/start',
	rental.startRental,
);
router.post(
	'/rental/:rentalId(\\d+)/claim',
	rental.claimRental,
);
router.post(
	'/request/:rentalId(\\d+)/renewal/accept',
	rental.acceptRenewal,
);
router.post(
	'/request/:rentalId(\\d+)/renewal/deny',
	rental.denyRenewal,
);
router.post(
	'/rental/:rentalId(\\d+)/end',
	rental.endRental,
);
router.post(
	'/rental/:rentalId(\\d+)/deposit/return',
	rental.returnDeposit,
);
router.post(
	'/rental/:rentalId(\\d+)/deposit/add',
	rental.addDeposit,
);
router.post(
	'/rental/:rentalId(\\d+)/deposit/consume',
	rental.consumeDeposit,
);
module.exports = router;
