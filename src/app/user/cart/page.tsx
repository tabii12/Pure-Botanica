"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Cart.module.css";

export default function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Lấy userId từ token trong localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Giải mã payload của JWT token
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        const decoded = JSON.parse(jsonPayload);
        const userIdFromToken = decoded.id || decoded._id; // Tùy vào key trong payload (id hoặc _id)
        if (userIdFromToken) {
          setUserId(userIdFromToken);
        } else {
          setError("Không tìm thấy userId trong token");
          setLoading(false);
        }
      } catch (err) {
        setError("Lỗi khi giải mã token");
        setLoading(false);
      }
    } else {
      setError("Vui lòng đăng nhập để xem giỏ hàng");
      setLoading(false);
    }
  }, []);

  // Gọi API để lấy giỏ hàng khi có userId
  useEffect(() => {
    if (!userId) return; // Không gọi API nếu không có userId

    const fetchCart = async () => {
      try {
        const response = await fetch(
          `https://api-zeal.onrender.com/api/carts?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Không thể lấy dữ liệu giỏ hàng");
        }
        const data = await response.json();
        setCart(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // Tính tổng cộng
  const calculateTotal = () => {
    if (!cart || !cart.items || cart.items.length === 0) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  };

  // Định dạng giá tiền
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className={styles["cart-container"]}>
      <div className={styles["progress-container"]}>
        <div className={`${styles.step} ${styles.active}`}>1</div>
        <span className={styles["progress-label"]}>Giỏ hàng</span>
        <i className="fa-solid fa-chevron-right"></i>

        <div className={styles.step}>2</div>
        <span className={styles["progress-label"]}>Chi tiết đơn hàng</span>
        <i className="fa-solid fa-chevron-right"></i>

        <div className={styles.step}>3</div>
        <span className={styles["progress-label"]}>Đơn hàng hoàn tất</span>
      </div>
      <div className={styles["cart-content"]}>
        {/* Phần trái: Danh sách sản phẩm */}
        <div className={styles["cart-left"]}>
          {loading ? (
            <p>Đang tải giỏ hàng...</p>
          ) : error ? (
            <p className={styles.error}>Lỗi: {error}</p>
          ) : !cart || !cart.items || cart.items.length === 0 ? (
            <p>Giỏ hàng trống</p>
          ) : (
            <table className={styles["cart-table"]}>
              <thead className={styles["cart-thead"]}>
                <tr className={styles["cart-row"]}>
                  <th className={styles["cart-header"]}>Sản phẩm</th>
                  <th className={styles["cart-header"]}>Giá</th>
                  <th className={styles["cart-header"]}>Số lượng</th>
                  <th className={styles["cart-header"]}>Tổng</th>
                  <th className={styles["cart-header"]}></th>
                </tr>
              </thead>
              <tbody className={styles["cart-tbody"]}>
                {cart.items.map((item) => (
                  <tr key={item._id} className={styles["cart-row"]}>
                    <td className={`${styles["cart-cell"]} ${styles.product}`}>
                      <Image
                        src={
                          item.product.images && item.product.images.length > 0
                            ? `https://api-zeal.onrender.com/images/${item.product.images[0]}`
                            : "https://via.placeholder.com/100x100?text=No+Image"
                        }
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className={styles["cart-image"]}
                      />
                      <span>{item.product.name}</span>
                    </td>
                    <td className={styles["cart-cell"]}>{formatPrice(item.product.price)}</td>
                    <td className={`${styles["cart-cell"]} ${styles["quantity-controls"]}`}>
                      <button className={`${styles["quantity-btn"]} ${styles.minus}`}>-</button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button className={`${styles["quantity-btn"]} ${styles.plus}`}>+</button>
                    </td>
                    <td className={styles["cart-cell"]}>
                      {formatPrice(item.product.price * item.quantity)}
                    </td>
                    <td className={styles["cart-cell"]}>
                      <i className="fa-solid fa-trash"></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <button className={styles["continue-shopping"]}>← Tiếp tục mua sắm</button>
        </div>

        {/* Phần phải: Thanh toán */}
        <div className={styles["cart-right"]}>
          <div className={styles.discount}>
            <input type="text" placeholder="Nhập mã giảm giá" className={styles["discount-input"]} />
            <button className={`${styles["discount-btn"]} ${styles.apply}`}>Sử dụng</button>
          </div>
          <div className={styles.summary}>
            <p className={styles["summary-item"]}>
              Tổng: <span>{formatPrice(calculateTotal())}</span>
            </p>
            <p className={styles["summary-item"]}>
              Mã giảm: <span>-0đ</span>
            </p>
            <div className={`${styles.total} ${styles["summary-total"]}`}>
              <strong className={styles.total2}>
                Tổng cộng: <span>{formatPrice(calculateTotal())}</span>
              </strong>
            </div>
          </div>
          <button className={styles.checkout}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
}