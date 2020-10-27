var express = require('express');
var router = express.Router();

var position = require("../controllers/PositionController");
const middleware = require('../middleware/middleware');

router.get('/all', middleware.allowIfLoggedin,middleware.grantAccess('readAny', 'position'), position.list);
router.get('/create', middleware.allowIfLoggedin,middleware.grantAccess('createAny', 'position'),position.create);
router.post('/save', middleware.allowIfLoggedin,middleware.grantAccess('createAny', 'position'), position.save);
router.get('/position/:id', middleware.allowIfLoggedin,middleware.grantAccess('readAny', 'position'),position.show);
router.get('/edit/:id', middleware.allowIfLoggedin,middleware.grantAccess('updateAny', 'position'), position.edit);
router.post('/update/:id',middleware.allowIfLoggedin,middleware.grantAccess('updateAny', 'position'),position.update);

module.exports = router;