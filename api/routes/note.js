const express = require('express');
const router= express.Router();
const noteController=require('../controllers/noteController');

router.post('/',noteController.create);
router.get('/pagination/:page',noteController.getNotes);
router.get('/:id',noteController.getNoteById);
router.patch('/:id',noteController.update);
router.delete('/:id',noteController.remove);
module.exports = router;