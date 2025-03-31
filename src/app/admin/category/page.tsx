import "./category.css";

export default function Category() {
  return (
    <>
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
                <tr>
                  <td>Mỹ Phẩm Nam</td>
                  <td>
                    <button className="btn-edit">
                      <a href="">Chỉnh sửa</a>
                    </button>
                    <button className="btn-remove">
                      <a href="">Xóa</a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Mỹ Phẩm Nữ</td>
                  <td>
                    <button className="btn-edit">
                      <a href="">Chỉnh sửa</a>
                    </button>
                    <button className="btn-remove">
                      <a href="">Xóa</a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Sữa Rửa Mặt</td>
                  <td>
                    <button className="btn-edit">
                      <a href="">Chỉnh sửa</a>
                    </button>
                    <button className="btn-remove">
                      <a href="">Xóa</a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Kem Chống Nắng</td>
                  <td>
                    <button className="btn-edit">
                      <a href="">Chỉnh sửa</a>
                    </button>
                    <button className="btn-remove">
                      <a href="">Xóa</a>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Kem Trị Mụn</td>
                  <td>
                    <button className="btn-edit">
                      <a href="">Chỉnh sửa</a>
                    </button>
                    <button className="btn-remove">
                      <a href="">Xóa</a>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}