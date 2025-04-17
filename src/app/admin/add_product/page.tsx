"use client";
import { useEffect, useState } from "react";
import "../add_product/add_product.css";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

interface Product {
  name: string;
  price: number;
  stock: number;
  images?: string[];
  category?: Category;
  description?: string;
  ingredients?: string[];
  usage_instructions?: string[];
  newImages?: File[];
}

export default function AddProductPage() {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    ingredients: [],
    usage_instructions: [],
    images: [],
    newImages: [],
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const getAuthToken = () => {
    return localStorage.getItem("authToken") || "";
  };

  const getHeaders = () => {
    const headers: HeadersInit = {};
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://api-zeal.onrender.com/api/categories", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Lỗi API: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("Dữ liệu danh mục không hợp lệ");
      }
      setCategories(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Lỗi khi tải danh mục:", errorMessage);
      showNotification("Không thể tải danh mục", "error");
    }
  };

  const validateForm = () => {
    if (!newProduct.name?.trim()) {
      return "Tên sản phẩm không được để trống";
    }
    if (newProduct.price === undefined || newProduct.price < 0) {
      return "Giá sản phẩm không hợp lệ";
    }
    if (newProduct.stock === undefined || newProduct.stock < 0) {
      return "Số lượng không hợp lệ";
    }
    if (!newProduct.category?._id) {
      return "Vui lòng chọn danh mục";
    }
    if (newProduct.newImages && newProduct.newImages.length > 5) {
      return "Chỉ được chọn tối đa 5 ảnh";
    }
    return null;
  };

  const handleAddProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Kiểm tra dữ liệu trước khi gửi
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      const formData = new FormData();
      formData.append("name", (newProduct.name ?? "").trim());
      formData.append("price", newProduct.price?.toString() || "0");
      formData.append("stock", newProduct.stock?.toString() || "0");
      formData.append("category_id", newProduct.category!._id);
      if (newProduct.description?.trim()) {
        formData.append("description", newProduct.description.trim());
      }
      if (newProduct.ingredients && newProduct.ingredients.length > 0) {
        formData.append("ingredients", JSON.stringify(newProduct.ingredients));
      }
      if (newProduct.usage_instructions && newProduct.usage_instructions.length > 0) {
        formData.append("usage_instructions", JSON.stringify(newProduct.usage_instructions));
      }
      if (newProduct.newImages && newProduct.newImages.length > 0) {
        newProduct.newImages.forEach((file, index) => {
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`Ảnh ${file.name} vượt quá giới hạn 5MB`);
          }
          if (!file.type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
            throw new Error(`Ảnh ${file.name} không đúng định dạng (jpg, jpeg, png, gif, webp)`);
          }
          formData.append("images", file);
        });
      } else {
        throw new Error("Vui lòng chọn ít nhất một ảnh");
      }

      console.log("Sending FormData:", Array.from(formData.entries()));

      const response = await fetch("https://api-zeal.onrender.com/api/products", {
        method: "POST",
        headers: getHeaders(),
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `Lỗi HTTP: ${response.status} (${response.statusText})`);
      }

      const savedProduct = await response.json();
      console.log("Saved Product:", savedProduct);

      setNewProduct({
        name: "",
        price: 0,
        stock: 0,
        description: "",
        ingredients: [],
        usage_instructions: [],
        images: [],
        newImages: [],
      });
      showNotification("Thêm sản phẩm thành công", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Lỗi khi thêm sản phẩm:", errorMessage, error);
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-management-container">
      {notification.show && <div className={`notification ${notification.type}`}>{notification.message}</div>}
      {loading && <div className="processing-indicator">Đang xử lý...</div>}
      <div className="title_container">
        <h1>THÊM SẢN PHẨM</h1>
      </div>
      <div className="modal-content">
        <h2>Thêm sản phẩm mới</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleAddProduct}>
          <label>Tên sản phẩm</label>
          <input
            type="text"
            value={newProduct.name || ""}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            required
          />
          <label>Giá</label>
          <input
            type="number"
            value={newProduct.price || 0}
            onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
            required
            min="0"
          />
          <label>Số lượng</label>
          <input
            type="number"
            value={newProduct.stock || 0}
            onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
            required
            min="0"
          />
          <label>Danh mục</label>
          <select
            value={newProduct.category?._id || ""}
            onChange={(e) => {
              const selectedCategory = categories.find((cat) => cat._id === e.target.value);
              setNewProduct({
                ...newProduct,
                category: selectedCategory
                  ? { _id: selectedCategory._id, name: selectedCategory.name, createdAt: selectedCategory.createdAt }
                  : undefined,
              });
            }}
            required
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <label>Mô tả</label>
          <textarea
            value={newProduct.description || ""}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            rows={4}
          />
          <label>Thành phần</label>
          <textarea
            value={newProduct.ingredients?.join("\n") || ""}
            onChange={(e) =>
              setNewProduct({ ...newProduct, ingredients: e.target.value.split("\n").filter(Boolean) })
            }
            rows={4}
            placeholder="Nhập từng thành phần trên một dòng"
          />
          <label>Hướng dẫn sử dụng</label>
          <textarea
            value={newProduct.usage_instructions?.join("\n") || ""}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                usage_instructions: e.target.value.split("\n").filter(Boolean),
              })
            }
            rows={4}
            placeholder="Nhập từng bước trên một dòng"
          />
          <label>Hình ảnh (tối đa 5 ảnh, yêu cầu ít nhất 1 ảnh)</label>
          <input
            type="file"
            className="file-input"
            multiple
            accept=".jpg,.jpeg,.png,.gif,.webp"
            onChange={(e) => {
              const files = Array.from(e.target.files || []).slice(0, 5);
              setNewProduct({ ...newProduct, newImages: files });
            }}
            required
          />
          <div className="modal-actions">
            <button type="submit" className="save-btn" disabled={loading}>
              Thêm sản phẩm
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                setNewProduct({
                  name: "",
                  price: 0,
                  stock: 0,
                  description: "",
                  ingredients: [],
                  usage_instructions: [],
                  images: [],
                  newImages: [],
                })
              }
              disabled={loading}
            >
              Xóa form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}