"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./Detail.module.css";
import { Product } from "@/app/components/product_interface";
import Image from "next/image"; // Nhập Image nếu muốn dùng

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const getImageUrl = (image: string): string => {
  if (!image) return "/images/placeholder.png"; // Hình ảnh dự phòng
  return `https://api-zeal.onrender.com/images/${image}`;
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
        const res = await fetch(`https://api-zeal.onrender.com/api/products/${id}`);
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
  const addToCart = () => {
    if (!product) return;

    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += quantity;
    } else {
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        image: product.images?.[0] || "",
        quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    alert("Đã thêm vào giỏ hàng!");
  };

  if (loading) return <p className="text-center py-10">Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p className="text-center py-10">Không tìm thấy sản phẩm.</p>;

  return (
    <>
      <div className={styles.container}>
        <section className={styles["product-section"]}>
          {/* Thumbnails */}
          <div className={styles["product-thumbnails"]}>
            {product.images?.map((image, index) => (
              <div
                key={index}
                className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ""}`}
                onClick={() => setCurrentImageIndex(index)}
              >
                {/* Sử dụng thẻ <img> hoặc thay bằng Image */}
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} thumbnail ${index + 1}`}
                />
                {/* Nếu muốn dùng Image của Next.js:
                <Image
                  src={getImageUrl(image)}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className={styles.thumbnailImage}
                />
                */}
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className={styles["product-image-container"]}>
            <div className={styles["product-main-image"]}>
              <img
                src={getImageUrl(product.images?.[currentImageIndex] || "")}
                alt={product.name}
              />
              {/* Nếu muốn dùng Image của Next.js:
              <Image
                src={getImageUrl(product.images?.[currentImageIndex] || "")}
                alt={product.name}
                width={400}
                height={400}
                className={styles.mainImage}
              />
              */}
            </div>
            <div className={styles["product-dots"]}>
              {product.images?.map((_, index) => (
                <div
                  key={index}
                  className={`${styles.dot} ${index === currentImageIndex ? styles.active : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                ></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles["product-info"]}>
            <h1 className={styles["product-title"]}>{product.name}</h1>
            <p className={styles["product-price"]}>
              {product.discountPrice ? (
                <>
                  <span className={styles["discount-price"]}>{formatPrice(product.discountPrice)}</span>
                  <span className={styles["original-price"]}>{formatPrice(product.price)}</span>
                  <span className={styles["discount-percent"]}>
                    {`-${Math.round(
                      ((product.price - product.discountPrice) / product.price) * 100
                    )}%`}
                  </span>
                </>
              ) : (
                <>{formatPrice(product.price)}</>
              )}
            </p>
            <p className={styles["product-description"]}>
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>

            <div className={styles["product-features"]}>
              {product.special?.map((feature, index) => (
                <div key={index} className={styles.feature}>
                  {feature}
                </div>
              ))}
            </div>

            <div className={styles["quantity-controls"]}>
              <div className={styles["quantity-wrapper"]}>
                <button className={`${styles["quantity-btn"]} ${styles.decrease}`} onClick={decreaseQty}>
                  −
                </button>
                <input
                  type="text"
                  className={styles["quantity-input"]}
                  value={quantity}
                  readOnly
                />
                <button className={`${styles["quantity-btn"]} ${styles.increase}`} onClick={increaseQty}>
                  +
                </button>
              </div>
              <button className={styles["add-to-cart"]} onClick={addToCart}>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <div className={styles["product-info"]}>
          <h2 className={styles["product-info-title"]}>Thông tin sản phẩm:</h2>
          <h3 className={styles["ingredients-title"]}>Thành phần:</h3>
          <p>{product.ingredients?.join(", ") || "Không có thông tin thành phần."}</p>

          <h3 className={styles["usage-title"]}>Hướng dẫn sử dụng:</h3>
          <ul className={styles["usage-list"]}>
            {product.usage_instructions?.map((instruction, index) => (
              <li key={index} className={styles["usage-item"]}>
                {instruction}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className={styles.cr}>
        <div className={styles["customer-review"]}>
          <h1 className={styles["review-main-title"]}>Đánh giá từ khách hàng</h1>
          <div className={styles["rating-summary"]}>
            <span className={styles["average-rating"]}>5.0</span>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles["review-count"]}>Theo 2 đánh giá</span>
          </div>

          <div className={styles.review}>
            <h2 className={styles["review-title"]}>Huy Bảo</h2>
            <div className={styles.stars}>★★★★★</div>
            <span className={styles["review-date"]}>Ngày: 20/03/2025</span>
            <p className={styles.comment}>ok</p>
          </div>

          <div className={styles.review}>
            <h2 className={styles["review-title"]}>Huy Bảo</h2>
            <div className={styles.stars}>★★★★☆</div>
            <span className={styles["review-date"]}>Ngày: 22/03/2025</span>
            <p className={styles.comment}>
              Mùi hương: thơm. Kết cấu: nhẹ nhàng cho da, giá này là khá đắt. Hơn 300k cho 300g, nếu có sale thì mình cũng sẽ cân nhắc.
            </p>
          </div>

          <button className={styles["write-review"]}>Viết đánh giá</button>
        </div>
      </div>

      {/* Contact Section */}
      <section className={styles["product-contact-section"]}>
        <h2 className={styles["contact-section-title"]}>
          Không tìm thấy được dòng sản phẩm mà bạn cần<br />hoặc thích hợp với da của bạn?
        </h2>
        <button className={styles["contact-button"]}>Liên hệ với chúng tôi</button>
      </section>
    </>
  );
}