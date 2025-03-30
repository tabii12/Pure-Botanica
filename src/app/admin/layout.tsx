import "./layout.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          <aside className="sidebar">
            <div className="logo">
              <img style={{ width: "200px" }} src="/image/logo.png" alt="Admin Logo" />
            </div>
            <nav className="menu">
              <a href="/admin" className="menu-item">Dashboard</a>
              <a href="/admin/danhmuc" className="menu-item">Danh mục</a>
              <a href="/admin/product" className="menu-item">Sản phẩm</a>
              <a href="/admin/oder" className="menu-item">Danh sách oder</a>
              <a href="/admin/comment" className="menu-item">Bình luận</a>
              <a href="/admin/khuyenmai" className="menu-item">Khuyến mãi</a>
              <a href="/admin/customer" className="menu-item">Khách hàng</a>
              <a href="/admin/user" className="menu-item">Admin</a>
              <a href="/admin/logout" className="menu-item">Đăng xuất</a>
            </nav>
          </aside>
          <main className="admin-content">{children}</main>
        </div>
      </body>
    </html>
  );
}