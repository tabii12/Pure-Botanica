"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import styles from "./Userinfo.module.css";

// Khai báo kiểu cho đơn hàng
interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
}

// Khai báo kiểu cho payload của token
interface CustomJwtPayload {
  id?: string;
  email?: string;
  role?: string;
}

const API_URL = "https://api-zeal.onrender.com/api";

export default function UserInfo() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch lịch sử đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");

      // Nếu không có token, chuyển hướng về trang đăng nhập
      if (!token) {
        router.push("/user/login");
        return;
      }

      try {
        // Decode token để lấy userId
        const decodedToken: CustomJwtPayload = jwtDecode(token);
        const userId = decodedToken.id;

        if (!userId) {
          throw new Error("Không tìm thấy ID người dùng trong token");
        }

        // Lấy lịch sử đơn hàng
        const ordersRes = await fetch(`${API_URL}/orders/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!ordersRes.ok) {
          throw new Error("Không thể lấy lịch sử đơn hàng");
        }

        const ordersData = await ordersRes.json();
        setOrders(ordersData.data || []);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Lỗi khi lấy đơn hàng:", err);
        setError("Đã xảy ra lỗi khi tải lịch sử đơn hàng.");
        localStorage.removeItem("token");
        router.push("/user/login");
      }
    };

    fetchOrders();
  }, [router]);

  // Xử lý đăng xuất
  const handleSignOut = () => {
    localStorage.removeItem("token");
    router.push("/user/login");
  };

  // Trạng thái khi đang tải
  if (isLoading) {
    return <div className={styles.loading}>Đang tải...</div>;
  }

  // Nếu có lỗi
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles["user-info-container"]}>
      <div className={styles["user-header"]}>
        <h2>Lịch sử đơn hàng</h2>
        <button className={styles["logout-btn"]} onClick={handleSignOut}>
          Đăng xuất
        </button>
      </div>

      <div className={styles["order-history"]}>
        {orders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.totalPrice.toLocaleString()} VNĐ</td>
                  <td>
                    <span
                      className={`${styles.status} ${
                        styles[order.status.toLowerCase()]
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles["no-orders"]}>Chưa có đơn hàng</p>
        )}
      </div>
    </div>
  );
}