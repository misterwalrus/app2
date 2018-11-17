const express = require('express');
const router = new express.Router();
const students = require('../controllers/students.js' );

router.route('/students/:pidm?')
    .get(students.get);

module.exports = router;