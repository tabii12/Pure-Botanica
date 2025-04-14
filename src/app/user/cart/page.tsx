"use client";
import styles from "./Cart.module.css";

export default function CartPage() {
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
              {[...Array(2)].map((_, index) => (
                <tr key={index} className={styles["cart-row"]}>
                  <td className={`${styles["cart-cell"]} ${styles.product}`}>
                    <img src="/images/product.png" alt="Đường thốt nốt" />
                    <span>Đường thốt nốt An Giang làm sạch da chết cơ thể</span>
                  </td>
                  <td className={styles["cart-cell"]}>165.000 đ</td>
                  <td className={`${styles["cart-cell"]} ${styles["quantity-controls"]}`}>
                    <button className={`${styles["quantity-btn"]} ${styles.minus}`}>-</button>
                    <span className={styles.quantity}>1</span>
                    <button className={`${styles["quantity-btn"]} ${styles.plus}`}>+</button>
                  </td>
                  <td className={styles["cart-cell"]}>165.000 đ</td>
                  <td className={styles["cart-cell"]}>
                    <i className="fa-solid fa-trash"></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
              Tổng: <span>7.605.000đ</span>
            </p>
            <p className={styles["summary-item"]}>
              Mã giảm: <span>-100.000đ</span>
            </p>
            <div className={`${styles.total} ${styles["summary-total"]}`}>
              <strong className={styles.total2}>
                Tổng cộng: <span>7.705.000đ</span>
              </strong>
            </div>
          </div>
          <button className={styles.checkout}>Thanh toán</button>
        </div>
      </div>
    </div>
  );
}