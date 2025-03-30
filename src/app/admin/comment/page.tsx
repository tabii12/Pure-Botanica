import "./comment.css";

export default function Comment() {
  return (
    <>
      <div className="title_container">
        <h1>BÌNH LUẬN</h1>
      </div>
      <div className="comments-container">
        <ul className="tabs">
          <li className="active">Tất cả bình luận</li>
        </ul>
        <table className="comments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Ngày</th>
              <th>Nội Dung</th>
              <th>Đánh Giá</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dinh The Nhan</td>
              <td>20-03-2025</td>
              <td>San phẩm quá oke luôn</td>
              <td>
                <span className="stars">★★★★☆</span>
              </td>
              <td>
                <form action="index.php?page=comment" method="POST">
                  <input type="hidden" name="id" value="1" />
                  <button className="delete-btn" name="submit">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </form>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Nguyen Van A</td>
              <td>21-03-2025</td>
              <td>Chất lượng tốt, giao hàng nhanh</td>
              <td>
                <span className="stars">★★★★★</span>
              </td>
              <td>
                <form action="index.php?page=comment" method="POST">
                  <input type="hidden" name="id" value="2" />
                  <button className="delete-btn" name="submit">
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}