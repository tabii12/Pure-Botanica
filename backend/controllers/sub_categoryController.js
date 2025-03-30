const sub_categories = require('../models/sub_categoriesModel');

const getAllSubCategories = async (req, res, next) => {
    try {
        const arr = await sub_categories.find().populate('categoryId');
        res.status(200).json(arr);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSubCategoryById = async (req, res, next) => {
    try {
        const arr = await sub_categories.findById(req.params.id).populate('categoryId');
        res.status(200).json(arr);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllSubCategories, getSubCategoryById };