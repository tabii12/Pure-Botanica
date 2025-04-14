"use client";
import { useEffect, useState } from "react";
import "../product/product.css";
import { Product } from "@/app/components/product_interface";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số sản phẩm trên mỗi trang

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api-zeal.onrender.com/api/products");
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải danh sách sản phẩm:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Đang tải danh sách sản phẩm...</p>;
  }

  // Tính toán số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Xử lý chuyển trang
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
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
            {currentProducts.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={`/images/${product.images[0]}`} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.sub_category?.name}</td>
                <td>{product.price.toLocaleString()}₫</td>
                <td>{product.stock_quantity}</td>
                <td>
                  <button className="edit-btn">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button className="delete-btn">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="pagination">
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trước
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`page-link ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="page-link"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Sau
        </button>
      </div>
    </div>
  );
}