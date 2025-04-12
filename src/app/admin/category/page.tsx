"use client";
import { useEffect, useState } from "react";
import "./category.css";

import type { Category } from "@/app/components/category_interface";

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3002/categories");
        const data = await res.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải danh sách danh mục:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa danh mục này không?")) return;

    try {
      const res = await fetch(`http://localhost:3002/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
      } else {
        console.error("Xóa không thành công");
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
    }
  };

  if (loading) {
    return <p className="text-center py-10">Đang tải danh sách danh mục...</p>;
  }

  return (
    <div className="container-category">
      <div className="form-table-category">
        <div className="name-table-category">
          <span>Danh Mục Sản Phẩm</span>
          <div className="form-btn-add-new-category">
            <button className="btn-add-new-category">
              <a href="/admin/add_category">Thêm danh mục sản phẩm</a>
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Tên Danh Mục</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>
                    <button className="btn-edit">
                      <a href={`/admin/edit_category?id=${category.id}`}>Chỉnh sửa</a>
                    </button>
                    <button
                      className="btn-remove"
                      onClick={() => handleDelete(category.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
