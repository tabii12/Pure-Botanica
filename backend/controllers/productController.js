//chèn multer để upload file
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, './public/images')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname)
  }
})
const checkfile = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
    return cb(new Error('Bạn chỉ được upload file ảnh'))
  }
  return cb(null, true)
}
const upload = multer({storage: storage, fileFilter: checkfile})

const categories = require('../models/categoryModel');
const products = require('../models/productModel');

const getAllProducts = async (req, res) => {
    try {
        const { name, idcate, limit, sort, page, hot, price } = req.query;
        
        let query = {}; // Query chứa điều kiện tìm kiếm
        let options = {}; // Các tùy chọn gồm limit và sort,...

        if (name) {  // Tìm kiếm theo tên sản phẩm, chữ i ko cần phân biệt hoa thường
            query.name = new RegExp(name, 'i'); 
        }
   
        if (hot) { // Tìm sản phẩm hot
            query.hot = parseInt(hot);
        }

        if (idcate) { // Tìm kiếm theo ID danh mục
            query.categoryId = idcate;
        }

        if (limit) {  // Giới hạn số lượng sản phẩm trả về
            options.limit = parseInt(limit);
        }

        if (sort) { // Sắp xếp theo giá
            options.sort = { price: sort === 'asc' ? 1 : -1 };
            // 'asc' cho sắp xếp tăng dần, 'desc' cho giảm dần
            console.log(options);
        }
        
        if (page) { // Phân trang
            options.skip = (parseInt(page) - 1) * options.limit; 
            //skip: bỏ qua bao nhiêu document
        }

        if (price) {
            query.price = { $eq: Number(price) };
        }

        const arr = await products.find(query, null, options).populate('categoryId', 'name');
        res.json(arr);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await products.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

//Thêm sản phẩm
const addPro =[upload.single('img'), async (req, res) => {
    try {
        //Lấy dữ liệu từ form gửi tới
        const product= req.body;
        //Lẩy tên ảnh từ file ảnh gửi đến
        product.img = req.file.originalname;
        console.log(product);
        //Tạo 1 instance của productModel
        const newProduct= new products(product);
        //kiểm tra iddanh mục có tồn tại ko 
        const category = await categories.findById(product.categoryId);
        if(!category){
            throw new Error('Danh mục ko tồn tại')
        }
        //Lưu vào database 
        const data= await newProduct.save();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}
]

//Sửa sản phẩm
const editPro =[upload.single('img'), async (req, res) => {
    try {
        const product= req.body;
        if(req.file){
              product.img = req.file.originalname;
        }
        const category = await categories.findById(product.categoryId);
        if(!category){
            throw new Error('Danh mục ko tồn tại')
        }
        const data= await products.findByIdAndUpdate(
            req.params.id,product,{new:true}
        )
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}]

//Xóa sản phẩm
const deletePro = async (req, res) => {
    try {
        const data= await products.findByIdAndDelete(req.params.id);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllProducts, getProductById,addPro,editPro,deletePro
};
