var express = require('express');
var router = express.Router();
const multer = require('multer')
const os = require('os')
const {signup, signin} = require('./controller');
router.post('/signup',multer({dest: os.tmpdir()}).single('image'),signup)
router.post('/signin',signin)

module.exports = router;
