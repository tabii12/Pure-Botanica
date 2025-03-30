import "./customer.css";

export default function Customer() {
  return (
    <>
      <div className="title_container">
        <h1>KHÁCH HÀNG</h1>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Họ Tên <i className="fa-solid fa-filter filter"></i>
              </th>
              <th>
                E-Mail <i className="fa-solid fa-filter filter"></i>
              </th>
              <th>Ngày sinh</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Dinh The Nhan</td>
              <td>nhandtps40210@gmail.com</td>
              <td>28-07-2005</td>
              <td>
                <div className="action-buttons">
                  <button className="btn">
                    <a href="">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </a>
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Nguyen Van A</td>
              <td>nguyenvana@gmail.com</td>
              <td>15-05-1990</td>
              <td>
                <div className="action-buttons">
                  <button className="btn">
                    <a href="">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </a>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="pagination">
          <button className="page-item">«</button>
          <button className="page-item active">1</button>
          <button className="page-item">2</button>
          <button className="page-item">3</button>
          <button className="page-item">4</button>
          <button className="page-item">»</button>
        </div>
      </div>
    </>
  );
}