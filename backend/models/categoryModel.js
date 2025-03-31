//Tạo cấu trúc schema cho dữ liệu categories
const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
const categorySchema = new mongoose.Schema({
    id : {type: ObjectId},
    name : {type: String, required : true }
});

//Tạo model từ Schema trên collection categories
//Chạy vô CSDL Mongo để lấy dữ liệu của categories ra
//  và kiểm tra dữ liệu đó có khớp với schema dữ liệu vừa tạo
const categories = mongoose.model('categories',categorySchema);

module.exports = categories;