const express = require('express');
const router = express.Router();
const contactForm = require('../controllers/contact-Controller');

// router.route('/contact').get(contactForm);
router.route('/contact').post(contactForm);
module.exports = router;
