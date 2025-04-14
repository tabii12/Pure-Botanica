"use client";
import { useEffect, useState } from "react";
import "../product/product.css";
import { Product } from "@/app/components/product_interface";



export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3002/products");
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
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img src={`/images/${product.images[0]}`} alt={product.name} width="50" />
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price.toLocaleString()}₫</td>
                <td>{product.quantity}</td>
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

      <div className="pagination">
        <a href="#" className="page-link">Trước</a>
        <a href="#" className="page-link active">1</a>
        <a href="#" className="page-link">2</a>
        <a href="#" className="page-link">3</a>
        <a href="#" className="page-link">Sau</a>
      </div>
    </div>
  );
}