var express = require('express');
var router = express.Router();

const { getAllSubCategories, getSubCategoryById } = require('../controllers/sub_categoryController');

router.get('/', getAllSubCategories); //Lấy tất cả danh mục con

router.get('/:id', getSubCategoryById); //Lấy chi tiết 1 danh mục con

module.exports = router;