const express = require('express');
const router = express.Router();

const mainController = require('../controller/main');

router.get('', mainController.getMain);

module.exports = router;
