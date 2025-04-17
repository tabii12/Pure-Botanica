"use client";
import React, { useState, useEffect } from "react";
import "../add_product/add_product.css"; // Import CSS file

const AddProduct = () => {
  const [categories, setCategories] = useState<any[]>([]); // Trạng thái cho danh mục
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    category: "",
    description: "",
    ingredients: "",
    usage_instructions: "",
    special: "",
    stock: "",
    images: [] as File[], // Lưu trữ file ảnh
  });

  // Fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api-zeal.onrender.com/api/categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi tải danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Xử lý thay đổi file input cho hình ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // Kiểm tra nếu có quá 4 ảnh
      if (files.length + formData.images.length > 4) {
        alert("Chỉ được chọn tối đa 4 ảnh.");
        return;
      }

      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...files],
      }));
    }
  };

  // Xử lý gửi form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", formData.name);
      productData.append("price", formData.price);
      productData.append("discountPrice", formData.discountPrice);
      productData.append("category", formData.category);
      productData.append("description", formData.description);
      productData.append("ingredients", JSON.stringify(formData.ingredients.split("\n").filter(Boolean)));
      productData.append("usage_instructions", JSON.stringify(formData.usage_instructions.split("\n").filter(Boolean)));
      productData.append("special", JSON.stringify(formData.special.split("\n").filter(Boolean)));
      productData.append("stock", formData.stock);

      // Thêm hình ảnh vào FormData
      formData.images.forEach((file) => {
        productData.append("images", file);
      });

      const response = await fetch("https://api-zeal.onrender.com/api/products", {
        method: "POST",
        body: productData,
      });

      if (response.ok) {
        alert("Sản phẩm đã được thêm thành công!");
        // Reset form
        setFormData({
          name: "",
          price: "",
          discountPrice: "",
          category: "",
          description: "",
          ingredients: "",
          usage_instructions: "",
          special: "",
          stock: "",
          images: [],
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Đã xảy ra lỗi khi thêm sản phẩm.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      alert("Đã xảy ra lỗi không xác định.");
    }
  };

  return (
    <div>
      <h1>Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Giá khuyến mãi</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category: any) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Thành phần</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleInputChange}
            placeholder="Nhập từng thành phần trên một dòng"
          />
        </div>
        <div>
          <label>Hướng dẫn sử dụng</label>
          <textarea
            name="usage_instructions"
            value={formData.usage_instructions}
            onChange={handleInputChange}
            placeholder="Nhập từng bước trên một dòng"
          />
        </div>
        <div>
          <label>Đặc điểm nổi bật</label>
          <textarea
            name="special"
            value={formData.special}
            onChange={handleInputChange}
            placeholder="Nhập từng đặc điểm trên một dòng"
          />
        </div>
        <div>
          <label>Số lượng</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Hình ảnh (Tối đa 4 ảnh)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
          <div>
            {formData.images.length > 0 && (
              <ul>
                {formData.images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <button type="submit">Thêm sản phẩm</button>
      </form>
    </div>
  );
};

export default AddProduct;
