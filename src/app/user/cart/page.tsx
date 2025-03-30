import "../cart/cart.css";

export default function CartPage() {
    return (
        <div className="cart-container">
            <div className="progress-container">
                <div className="step active">1</div>
                <span>Giỏ hàng</span>
              <i className="fa-solid fa-chevron-right"></i>

                <div className="step">2</div>
                <span>Chi tiết đơn hàng</span>
              <i className="fa-solid fa-chevron-right"></i>

                <div className="step">3</div>
                <span>Đơn hàng hoàn tất</span>
            </div>
            <div className="cart-content">
                {/* Phần trái: Danh sách sản phẩm */}
                <div className="cart-left">
                    <table>
                        <thead>
                            <tr>
                                <th>Sản phẩm</th>
                                <th>Giá</th>
                                <th>Số lượng</th>
                                <th>Tổng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(2)].map((_, index) => (
                                <tr key={index}>
                                    <td className="product">
                                        <img src="/images/product.png" alt="Đường thốt nốt" />
                                        <span>Đường thốt nốt An Giang làm sạch da chết cơ thể</span>
                                    </td>
                                    <td>165.000 đ</td>
                                    <td className="quantity-controls">
                                        <button className="minus">-</button>
                                        <span className="quantity">1</span>
                                        <button className="plus">+</button>
                                    </td>
                                    <td>165.000 đ</td>
                                    <td>
                                    <i className="fa-solid fa-trash"></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button className="continue-shopping">← Tiếp tục mua sắm</button>
                </div>

                {/* Phần phải: Thanh toán */}
                <div className="cart-right">
                    <div className="discount">
                        <input type="text" placeholder="Nhập mã giảm giá" />
                        <button className="apply">Sử dụng</button>
                    </div>
                    <div className="summary">
                        <p>Tổng: <span>7.605.000đ</span></p>
                        <p>Mã giảm: <span>-100.000đ</span></p>
                        <h6 className="total">
                            <strong className="total2">Tổng cộng: <span>7.705.000đ</span></strong>
                        </h6>
                    </div>
                    <button className="checkout">Thanh toán</button>
                </div>
            </div>
        </div>
    );
}