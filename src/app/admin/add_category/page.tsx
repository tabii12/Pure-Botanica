import "./add_category.css";

export default function AddCatePage() {
    return (
        <div className="container">
            <h1>Thêm Danh Mục Mới</h1>

            <form>
                <div className="form-group">
                    <label htmlFor="category-name">
                        Tên danh mục <span style={{ color: "red" }}>*</span>
                    </label>
                    <input type="text" id="category-name" placeholder="Nhập tên danh mục" required />
                </div>

                <div className="form-group">
                    <label htmlFor="parent-category">Danh mục cha</label>
                    <select id="parent-category">
                        <option value="0">-- Không có --</option>
                        <option value="1">Mỹ Phẩm</option>
                        <option value="2">Sức Khỏe &amp; Làm Đẹp</option>
                        <option value="3">Chăm Sóc Da</option>
                    </select>
                    <p className="helper-text">Chọn danh mục cha nếu đây là danh mục con.</p>
                </div>

                <div className="action-buttons">
                    <button type="submit" className="btn btn-primary">Lưu danh mục</button>
                    <button type="button" className="btn btn-cancel">Hủy</button>
                </div>
            </form>
        </div>
    );
}
