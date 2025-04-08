"use client";

import { useState } from "react";
import "./detail.css";

export default function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [mainImageSrc, setMainImageSrc] = useState("/images/4.jpg");
  const [activeThumbnail, setActiveThumbnail] = useState(0);
  const [activeDot, setActiveDot] = useState(0);

  const thumbnails = ["/images/4.jpg", "/images/3.png", "/images/2.png", "/images/1.png"];

  const handleThumbnailClick = (index: number) => {
    setActiveThumbnail(index);
    setMainImageSrc(thumbnails[index]);
    setActiveDot(index);
  };

  const handleDotClick = (index: number) => {
    setActiveDot(index);
    setActiveThumbnail(index);
    setMainImageSrc(thumbnails[index]);
  };

  const handleAddToCart = () => {
    alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
  };

  return (
    <main className="container">
      <section className="product-section">
        <div className="product-thumbnails">
          {thumbnails.map((src, index) => (
            <div
              key={index}
              className={`thumbnail ${activeThumbnail === index ? "active" : ""}`}
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={src} alt={`Thumbnail ${index + 1}`} />
            </div>
          ))}
        </div>

        <div className="product-image-container">
          <div className="product-main-image">
            <img src={mainImageSrc} alt="Ảnh sản phẩm chính" />
          </div>
          <div className="product-dots">
            {thumbnails.map((_, index) => (
              <div
                key={index}
                className={`dot ${activeDot === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">Đường thốt nốt An Giang làm sạch da chết cơ thể 200ml</h1>
          <p className="product-price">165.000 đ</p>
          <p className="product-description">
            Hãy sẵn sàng trải nghiệm những tinh thể đường thốt nốt nhuyễn mịn kết hợp với nam châm đường ẩm Pentavitin...
          </p>

          <div className="product-features">
            <div className="feature">Không chứa cồn</div>
            <div className="feature">Không sulfate</div>
            <div className="feature">Không dầu khoáng</div>
            <div className="feature">Không paraben</div>
            <div className="feature">Không vỉ hạt nhựa</div>
          </div>

          <div className="quantity-controls">
            <div className="quantity-wrapper">
              <button
                className="quantity-btn decrease"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                −
              </button>
              <input
                type="text"
                className="quantity-input"
                value={quantity}
                readOnly
              />
              <button
                className="quantity-btn increase"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </section>

      <div className="product-info">
        <h2>Thông tin sản phẩm:</h2>
        <h3>Thành phần:</h3>
        <p>Đường thốt nốt An Giang được chiết xuất từ 100% đường thốt nốt nguyên chất...</p>

        <h3>Hướng dẫn sử dụng:</h3>
        <ul>
          <li>Làm một đợt: Trước khi sử dụng, hãy tắm và làm ướt toàn bộ cơ thể.</li>
          <li>Thoa sản phẩm: Lấy một lượng vừa đủ và xoa đều sản phẩm và da.</li>
          <li>Mát-xa nhẹ: Tập trung vào khuỷu tay, đầu gối và gót chân.</li>
          <li>Rửa sạch: Rửa lại bằng nước ấm để loại bỏ tế bào da chết.</li>
          <li>Tần suất: Sử dụng 2-3 lần mỗi tuần để đạt hiệu quả tốt nhất.</li>
        </ul>
      </div>

      <div className="cr">
        <div className="customer-review">
          <h1>Đánh giá từ khách hàng</h1>
          <div className="rating-summary">
            <span className="average-rating">5.0</span>
            <div className="stars">★★★★★</div>
            <span className="review-count">Theo 2 đánh giá</span>
          </div>
          <div className="review">
            <h2>Huy Bảo</h2>
            <div className="stars">★★★★★</div>
            <span className="review-date">Ngày: 20/03/2025</span>
            <p className="comment">ok</p>
          </div>
          <div className="review">
            <h2>Huy Bảo</h2>
            <div className="stars">★★★★☆</div>
            <span className="review-date">Ngày: 22/03/2025</span>
            <p className="comment">
              Mùi hương: thơm. Kết cấu: nhẹ nhàng cho da, giá này khá đắt. Nếu có sale thì mình cũng sẽ cân nhắc.
            </p>
          </div>
          <button className="write-review">Viết đánh giá</button>
        </div>
      </div>

      <section className="product-contact-section">
        <h2 className="contact-title">
          Không tìm thấy được dòng sản phẩm mà bạn cần
          <br />
          hoặc thích hợp với da của bạn?
        </h2>
        <button className="contact-button">Liên hệ với chúng tôi</button>
      </section>
    </main>
  );
}
