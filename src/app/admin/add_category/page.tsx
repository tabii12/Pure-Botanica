"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./add_category.css";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://api-zeal.onrender.com/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        alert("Thêm danh mục thành công!");
        router.push("/admin/category");
      } else {
        alert("Thêm danh mục thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm danh mục:", error);
      alert("Đã xảy ra lỗi khi thêm danh mục.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-category">
      <h2>Thêm Danh Mục Mới</h2>
      <form onSubmit={handleSubmit} className="add-category-form">
        <div className="form-group">
          <label htmlFor="name">Tên Danh Mục</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Nhập tên danh mục"
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-add" disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm Danh Mục"}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => router.push("/admin/category")}
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
}