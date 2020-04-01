const express = require('express');
const controller = require('./../controllers/pollController');
const auth = require('./../controllers/authController');

const router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/user/:name', auth.isOwner, controller.find);
router.post('/', controller.create);
router.post('/:id/:option', auth.protect, controller.addVote);
router.put('/:id', auth.protect, controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
