import "./page.css";

export default function AD_Home() {
    return (
        <>
            <div className="main-content">
                <header className="dashboard-header">
                    <h2>Dashboard</h2>
                    <p>Chào mừng bạn trở lại, Admin!</p>
                </header>

                <section className="stats-container">
                    <div className="stat-box">
                        <h3>1,245</h3>
                        <p>Đơn hàng hôm nay</p>
                    </div>
                    <div className="stat-box">
                        <h3>5,320</h3>
                        <p>Người dùng mới</p>
                    </div>
                    <div className="stat-box">
                        <h3>12,450</h3>
                        <p>Doanh thu hôm nay (VNĐ)</p>
                    </div>
                    <div className="stat-box">
                        <h3>320</h3>
                        <p>Bình luận mới</p>
                    </div>
                </section>

                <section className="chart-container">
                    <canvas id="revenueChart"></canvas>
                </section>

                <section className="recent-orders">
                    <h3>Đơn hàng gần đây</h3>
                    <table>
                        <caption>Danh sách các đơn hàng gần đây</caption>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Khách hàng</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#1021</td>
                                <td>Đinh Thế Nhân</td>
                                <td>Sữa rửa mặt</td>
                                <td>1,200,000 VNĐ</td>
                                <td>Đang giao</td>
                            </tr>
                            <tr>
                                <td>#1022</td>
                                <td>Nguyễn Van Khanh</td>
                                <td>Kem trống nắng</td>
                                <td>1,500,000 VNĐ</td>
                                <td>Hoàn thành</td>
                            </tr>
                            <tr>
                                <td>#1023</td>
                                <td>Phạm Nguyễn Hải Triều</td>
                                <td>Kem trị mụn</td>
                                <td>1,000,000 VNĐ</td>
                                <td>Đang xử lý</td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </>
    );
}