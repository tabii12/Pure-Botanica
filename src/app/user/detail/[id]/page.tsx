"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "./detail.css";
import { Product } from "@/app/components/product_interface";



const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const getImageUrl = (image: string): string => {
  if (image.startsWith("/")) return image;
  return `/images/${image}`;
};

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3002/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi tải chi tiết sản phẩm:", error);
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (loading) return <p className="text-center py-10">Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p className="text-center py-10">Không tìm thấy sản phẩm.</p>;

  return (
    <>
      <div className="container">
        <section className="product-section">
          {/* Thumbnails */}
          <div className="product-thumbnails">
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img src={getImageUrl(image)} alt={`${product.name} thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="product-image-container">
            <div className="product-main-image">
              <img
                src={getImageUrl(product.images?.[currentImageIndex] || "")}
                alt={product.name}
              />
            </div>
            <div className="product-dots">
              {product.images?.map((_, index) => (
                <div
                  key={index}
                  className={`dot ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">{formatPrice(product.price)}</p>
            <p className="product-description">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>

            <div className="product-features">
              {product.special?.map((feature, index) => (
                <div key={index} className="feature">
                  {feature}
                </div>
              ))}
            </div>

            <div className="quantity-controls">
              <div className="quantity-wrapper">
                <button className="quantity-btn decrease" onClick={decreaseQty}>−</button>
                <input type="text" className="quantity-input" value={quantity} readOnly />
                <button className="quantity-btn increase" onClick={increaseQty}>+</button>
              </div>
              <button className="add-to-cart">Thêm vào giỏ hàng</button>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <div className="product-info">
          <h2>Thông tin sản phẩm:</h2>
          <h3>Thành phần:</h3>
          <p>{product.ingredients?.join(", ") || "Không có thông tin thành phần."}</p>

          <h3>Hướng dẫn sử dụng:</h3>
          <ul>
            {product.usage_instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Reviews */}
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
              Mùi hương: thơm. Kết cấu: nhẹ nhàng cho da, giá này là khá đắt. Hơn 300k cho 300g, nếu có sale thì mình cũng sẽ cân nhắc.
            </p>
          </div>

          <button className="write-review">Viết đánh giá</button>
        </div>
      </div>

      {/* Contact Section */}
      <section className="product-contact-section">
        <h2 className="contact-title">
          Không tìm thấy được dòng sản phẩm mà bạn cần<br />hoặc thích hợp với da của bạn?
        </h2>
        <button className="contact-button">Liên hệ với chúng tôi</button>
      </section>
    </>
  );
}
