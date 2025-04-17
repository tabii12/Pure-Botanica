"use client";
import { useEffect, useState } from "react";
import "../product/product.css";
import router from "next/router";

interface Category {
  _id: string;
  name: string;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images?: string[];
  category?: Category;
  description?: string;
  ingredients?: string[];
  usage_instructions?: string[];
  special?: string[];
  newImages?: File[];
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const productsPerPage = 9;

  useEffect(() => {
    fetchProducts();
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

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("https://api-zeal.onrender.com/api/products", { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`Lỗi API: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (!Array.isArray(data)) {
        throw new Error("Dữ liệu sản phẩm không hợp lệ");
      }
      setProducts(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Lỗi khi tải danh sách sản phẩm:", errorMessage);
      setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
      showNotification("Không thể tải danh sách sản phẩm", "error");
    } finally {
      setLoading(false);
    }
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
    if (!editProduct?.name?.trim()) {
      return "Tên sản phẩm không được để trống";
    }
    if (editProduct?.price === undefined || editProduct.price < 0) {
      return "Giá sản phẩm không hợp lệ";
    }
    if (editProduct?.stock === undefined || editProduct.stock < 0) {
      return "Số lượng không hợp lệ";
    }
    if (!editProduct?.category?._id) {
      return "Vui lòng chọn danh mục";
    }
    if (editProduct?.newImages && editProduct.newImages.length > 4) {
      return "Chỉ được chọn tối đa 4 ảnh";
    }
    return null;
  };

  const handleEdit = (product: Product) => {
    setEditProduct({ ...product, newImages: [] });
    setIsEditing(true);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editProduct || !editProduct._id) return;

    try {
      setLoading(true);
      setError(null);

      // Kiểm tra dữ liệu trước khi gửi
      const validationError = validateForm();
      if (validationError) {
        throw new Error(validationError);
      }

      const formData = new FormData();
      formData.append("name", editProduct.name || "");
      formData.append("price", editProduct.price?.toString() || "0");
      formData.append("stock", editProduct.stock?.toString() || "0");
      if (editProduct.category?._id) {
        formData.append("category_id", editProduct.category._id);
      }
      if (editProduct.description) {
        formData.append("description", editProduct.description);
      }
      if (editProduct.ingredients && editProduct.ingredients.length > 0) {
        formData.append("ingredients", JSON.stringify(editProduct.ingredients));
      }
      if (editProduct.usage_instructions && editProduct.usage_instructions.length > 0) {
        formData.append("usage_instructions", JSON.stringify(editProduct.usage_instructions));
      }
      if (editProduct.special && editProduct.special.length > 0) {
        formData.append("special", JSON.stringify(editProduct.special));
      }
      if (editProduct.newImages && editProduct.newImages.length > 0) {
        editProduct.newImages.forEach((file) => {
          if (file.size > 5 * 1024 * 1024) {
            throw new Error(`Ảnh ${file.name} vượt quá giới hạn 5MB`);
          }
          if (!file.type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
            throw new Error(`Ảnh ${file.name} không đúng định dạng (jpg, jpeg, png, gif, webp)`);
          }
          formData.append("images", file);
        });
      } else if (editProduct.images && editProduct.images.length > 0) {
        // Gửi mảng ảnh hiện tại nếu không có ảnh mới
        formData.append("images", JSON.stringify(editProduct.images));
      }

      console.log("Sending FormData:", Array.from(formData.entries())); // Debug FormData

      const response = await fetch(`https://api-zeal.onrender.com/api/products/${editProduct._id}`, {
        method: "PUT",
        headers: {
          Authorization: getHeaders()["Authorization"],
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
      }

      const updatedProduct = await response.json();
      console.log("Updated Product:", updatedProduct); // Debug response

      setProducts(products.map((p) => (p._id === editProduct._id ? updatedProduct : p)));
      setIsEditing(false);
      setEditProduct(null);
      showNotification("Cập nhật sản phẩm thành công", "success");
      router.replace(router.asPath);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Lỗi khi cập nhật sản phẩm:", errorMessage);
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleting(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      setLoading(true);
      const response = await fetch(`https://api-zeal.onrender.com/api/products/${deleteId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Lỗi HTTP: ${response.status}`);
      }

      setProducts(products.filter((product) => product._id !== deleteId));
      setIsDeleting(false);
      setDeleteId(null);
      showNotification("Xóa sản phẩm thành công", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Lỗi không xác định";
      console.error("Lỗi khi xóa sản phẩm:", errorMessage);
      showNotification("Đã xảy ra lỗi khi xóa sản phẩm", "error");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading && products.length === 0) {
    return <p className="text-center py-10">Đang tải danh sách sản phẩm...</p>;
  }

  if (error && products.length === 0) {
    return (
      <div className="error-container text-center py-10">
        <p className="error-message">{error}</p>
        <button className="retry-button mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={fetchProducts}>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className="product-management-container">
      {notification.show && <div className={`notification ${notification.type}`}>{notification.message}</div>}
      {loading && products.length > 0 && <div className="processing-indicator">Đang xử lý...</div>}
      <div className="title_container">
        <h1>SẢN PHẨM</h1>
        <a href="/admin/add_product" className="add-product-btn">Thêm Sản Phẩm +</a>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.images && product.images.length > 0 ? `/images/${product.images[0]}` : "/images/placeholder.png"}
                      alt={product.name}
                      width="50"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/placeholder.png";
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category?.name || "Chưa phân loại"}</td>
                  <td>{product.price}₫</td>
                  <td>{product.stock}</td>
                  <td className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(product)} disabled={loading}>
                      Sửa
                    </button>
                    <button className="delete-btn" onClick={() => confirmDelete(product._id)} disabled={loading}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4">Không có sản phẩm nào</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="pagination">
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || loading}>
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(index + 1)}
              disabled={loading}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
          >
            Sau
          </button>
        </div>
      )}
      {isDeleting && (
        <div className="modal">
          <div className="modal-content">
            <h2>Xác nhận xóa sản phẩm</h2>
            <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            <div className="modal-actions">
              <button className="confirm-btn" onClick={handleDelete}>Xóa</button>
              <button className="cancel-btn" onClick={() => setIsDeleting(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
      {isEditing && editProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>Chỉnh sửa sản phẩm</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleUpdate}>
              <label>Tên sản phẩm</label>
              <input
                type="text"
                value={editProduct.name || ""}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                required
              />
              <label>Giá</label>
              <input
                type="number"
                value={editProduct.price || 0}
                onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
                required
                min="0"
              />
              <label>Số lượng</label>
              <input
                type="number"
                value={editProduct.stock || 0}
                onChange={(e) => setEditProduct({ ...editProduct, stock: Number(e.target.value) })}
                required
                min="0"
              />
              <label>Danh mục</label>
              <select
                value={editProduct.category?._id || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category: categories.find((cat) => cat._id === e.target.value) || undefined,
                  })
                }
                required
              >
                <option value="">-- Chọn danh mục --</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <label>Mô tả</label>
              <textarea
                value={editProduct.description || ""}
                onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
              ></textarea>

              <label>Thành phần (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={editProduct.ingredients?.join(", ") || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    ingredients: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />

              <label>Hướng dẫn sử dụng (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={editProduct.usage_instructions?.join(", ") || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    usage_instructions: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />

              <label>Điểm đặc biệt (phân cách bằng dấu phẩy)</label>
              <input
                type="text"
                value={editProduct.special?.join(", ") || ""}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    special: e.target.value.split(",").map((item) => item.trim()),
                  })
                }
              />

              <label>Ảnh mới (tối đa 4 ảnh)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    newImages: e.target.files ? Array.from(e.target.files) : [],
                  })
                }
              />

              <div className="modal-actions">
                <button className="confirm-btn" type="submit" disabled={loading}>
                  Cập nhật
                </button>
                <button
                  className="cancel-btn"
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditProduct(null);
                    setError(null);
                  }}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}