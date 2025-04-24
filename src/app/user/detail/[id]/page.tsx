"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./Detail.module.css";
import { Product } from "@/app/components/product_interface";
import Image from "next/image"; 

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
  const [userId, setUserId] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    // Lấy userId từ token JWT
    const getUserIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const base64Url = token.split(".")[1];
          const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split("")
              .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
              .join("")
          );
          const decoded = JSON.parse(jsonPayload);
          const userIdFromToken = decoded.id || decoded._id;
          if (userIdFromToken) {
            setUserId(userIdFromToken);
          }
        } catch (err) {
          console.error("Lỗi khi giải mã token:", err);
        }
      }
    };

    getUserIdFromToken();
  }, []);

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
  
  const addToCart = async () => {
    if (!product) return;

    // Kiểm tra nếu người dùng đã đăng nhập
    if (!userId) {
      setCartMessage({
        type: 'error',
        text: 'Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng'
      });
      
      // Lưu vào localStorage như trước đây
      const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingItemIndex = cartItems.findIndex((item: any) => item.id === product._id);

      if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        cartItems.push({
          id: product._id,
          name: product.name,
          price: product.discountPrice || product.price,
          image: product.images?.[0] || "",
          quantity,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
      alert("Đã thêm vào giỏ hàng (localStorage)!");
      return;
    }

    setAddingToCart(true);
    
    try {
      // Kiểm tra xem sản phẩm ID có đúng không 
      const productId = product._id;
      if (!productId) {
        throw new Error("ID sản phẩm không hợp lệ");
      }
      
      console.log("Product ID:", productId);
      console.log("User ID:", userId);
      console.log("Quantity:", quantity);
      
      // Sử dụng endpoint chính xác user/carts/add
      const response = await fetch(
        `https://api-zeal.onrender.com/api/carts/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            productId: productId,
            quantity: quantity
          }),
        }
      );
      
      const responseData = await response.json();
      console.log("API response:", responseData);
      
      if (!response.ok) {
        throw new Error(responseData.message || "Không thể thêm sản phẩm vào giỏ hàng");
      }
      
      setCartMessage({
        type: 'success',
        text: 'Đã thêm sản phẩm vào giỏ hàng!'
      });
      
      // Xóa thông báo sau 3 giây
      setTimeout(() => {
        setCartMessage(null);
      }, 3000);
      
    } catch (error: any) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      setCartMessage({
        type: 'error',
        text: `Lỗi: ${error.message}`
      });
    } finally {
      setAddingToCart(false);
    }
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
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} thumbnail ${index + 1}`}
                />
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
              <button 
                className={styles["add-to-cart"]} 
                onClick={addToCart}
                disabled={addingToCart}
              >
                {addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}
              </button>
            </div>

            {/* Thông báo kết quả thêm vào giỏ hàng */}
            {cartMessage && (
              <div className={`${styles["cart-message"]} ${styles[cartMessage.type]}`}>
                {cartMessage.text}
              </div>
            )}
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