const express = require('express');
const router = express.Router();
const <%= serviceName %>Ctrl = require('../app/controllers/<%= serviceName %>')


router.get('/all', <%= serviceName %>Ctrl.findAll);






module.exports = router;


