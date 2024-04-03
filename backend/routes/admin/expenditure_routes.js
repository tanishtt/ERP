const express= require('express');
const router= express.Router();
const {getExpenditure, postExpenditure, updateExpenditure, deleteExpenditure}= require('../../controllers/admin/expenditure');

router.get('/get-expenditure',getExpenditure);
router.post('/post-expenditure', postExpenditure);
router.post('/update-expenditure/:expenditure_id', updateExpenditure);
router.delete('/delete-expenditure/:expenditure_id', deleteExpenditure);

module.exports= router;