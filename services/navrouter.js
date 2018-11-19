const express = require('express');
const navrouter = new express.Router();
const home = require('../controllers/home.js' );

navrouter.route('/sendemail') 
    .post(home.post);

    module.exports = navrouter;