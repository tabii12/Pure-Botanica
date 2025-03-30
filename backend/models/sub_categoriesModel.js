const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const sub_categorySchema = new mongoose.Schema({
    id : {type: ObjectId},
    name : {type: String, required : true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
});

const sub_categories = mongoose.model('sub_categories',sub_categorySchema);

module.exports = sub_categories;