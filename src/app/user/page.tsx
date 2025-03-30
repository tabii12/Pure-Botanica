import Image from "next/image";
import "./page.css";

export default function Home() {
  return (
    <div>
      <div className="container">
        <div className="banner">
          <img src="/images//mainbanner.png" alt="Main Banner" />
        </div>

        <section className="new-products-section">
          {/* Product row with text and slider in the same row */}
          <div className="products-row">
            {/* Text content */}
            <div className="text-content">
              <h2 className="section-title">Sản phẩm mới</h2>
              <p className="section-description">
                Pure Botanica tự hào giới thiệu các sản phẩm mới, mang đến những trải nghiệm vượt trội và cải thiện làn da, mái tóc của bạn mỗi ngày.
              </p>
            </div>

            {/* Product slider */}
            <div className="new-products">
            
              <div className="new-products-grid">
                <div className="new-product-card">
                  <div className="new-product-badge">New</div>
                  <div className="new-product-image">
                    <img src="/images/new_product1.png" alt="New Product" />
                  </div>
                  <div className="new-product-details">
                    <h3 className="new-product-name">Kem Dưỡng Da Cao Cấp</h3>
                    <p className="new-product-price">250.000đ</p>
                  </div>
                </div>
                <div className="new-product-card">
                  <div className="new-product-badge">New</div>
                  <div className="new-product-image">
                    <img src="/images/new_product2.png" alt="New Product" />
                  </div>
                  <div className="new-product-details">
                    <h3 className="new-product-name">Serum Dưỡng Ẩm Chuyên Sâu</h3>
                    <p className="new-product-price">320.000đ</p>
                  </div>
                </div>
                <div className="new-product-card">
                  <div className="new-product-badge">New</div>
                  <div className="new-product-image">
                    <img src="/images/new_product3.png" alt="New Product" />
                  </div>
                  <div className="new-product-details">
                    <h3 className="new-product-name">Sữa Rửa Mặt Thiên Nhiên</h3>
                    <p className="new-product-price">180.000đ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features section */}
          <div className="features-section">
            <div className="feature-card">
              <h4 className="feature-title">Giao hàng toàn quốc
                
              </h4>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Bảo đảm chất lượng
              </h4>
              <br /><h4 className="feture-2">Sản phẩm làm từ thiên nhiên</h4>
            </div>
            <div className="feature-card">
              <h4 className="feature-title">Đổi trả sản phẩm
              
              </h4><br /><h4 className="feture-2">Với sản phẩm lỗi sản xuất </h4>
           

            </div>
            <div className="feature-card">
              <h4 className="feature-title">Hỗ trợ khách hàng
                
              </h4>
              <br /><h4 className="feture-2">Tư vấn nhiệt tình 24/7 </h4>
            </div>
          </div>
        </section>

        {/* Hero section */}
        <div className="hero-section-rela">
          <section className="hero-section">
            <div className="hero-content">
              <h1 className="hero-title">Tự nhiên tỏa sáng cùng bộ trang điểm thiên nhiên</h1>
            </div>
          </section>

          <div className="category-nav">
            <a href="#" className="category-item">
              <img src="/images//botrangdiem.png" alt="Trang điểm" className="category-icon" />
              <p className="category-label">Bộ trang điểm</p>
            </a>
            <a href="#" className="category-item">
              <img src="/images//chamsocda.png" alt="Chăm sóc da" className="category-icon" />
              <p className="category-label">Chăm sóc da</p>
            </a>
            <a href="#" className="category-item">
              <img src="/images//chamsoccothe.png" alt="Chăm sóc cơ thể" className="category-icon" />
              <p className="category-label">Chăm sóc cơ thể</p>
            </a>
            <a href="#" className="category-item">
              <img src="/images//chamsoctoc.png" alt="Chăm sóc tóc" className="category-icon" />
              <p className="category-label">Chăm sóc tóc</p>
            </a>
            <a href="#" className="category-item">
              <img src="/images//huongthom.png" alt="Hương thơm" className="category-icon" />
              <p className="category-label">Hương thơm</p>
            </a>
            <a href="#" className="category-item">
              <img src="/images//mevabe.png" alt="Mẹ và bé" className="category-icon" />
              <p className="category-label">Mẹ và bé</p>
            </a>
          </div>
        </div>

        <div className="container">
          <section className="botanical-gallery">
            <div className="botanical-frame-left">
              <img
                src="/images//cosmetics nature_1.png"
                alt="Sản phẩm Pure Botanica với lá xanh và hoa"
                className="botanical-photo"
              />
              <div className="botanical-caption">
                Hãy để Pure Botanica nâng niu làn da của bạn với 100% trích xuất từ thiên nhiên
              </div>
            </div>

            <div className="botanical-frame-right">
              <img
                src="/images//cosmetics nature_1.png"
                alt="Bộ sưu tập sản phẩm Pure Botanica"
                className="botanical-photo"
              />
              <div className="botanical-caption">
                Chúng tôi chọn thiên nhiên, bạn chọn sự an lành
              </div>
            </div>
          </section>

          <div className="best-selling-products">
            <h2 className="best-selling-section-title">Sản phẩm bán chạy</h2>
            <div className="best-selling-grid">
              <div className="best-selling-card">
                <div className="best-selling-badge">Hot</div>
                <div className="best-selling-image">
                  <img src="/api/placeholder/200/200" alt="Product Image" />
                </div>
                <div className="best-selling-details">
                  <h3 className="best-selling-name">Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h3>
                  <p className="best-selling-price">140.000đ</p>
                </div>
              </div>
              <div className="best-selling-card">
                <div className="best-selling-badge">Hot</div>
                <div className="best-selling-image">
                  <img src="/api/placeholder/200/200" alt="Product Image" />
                </div>
                <div className="best-selling-details">
                  <h3 className="best-selling-name">Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h3>
                  <p className="best-selling-price">140.000đ</p>
                </div>
              </div>
              <div className="best-selling-card">
                <div className="best-selling-badge">Hot</div>
                <div className="best-selling-image">
                  <img src="/api/placeholder/200/200" alt="Product Image" />
                </div>
                <div className="best-selling-details">
                  <h3 className="best-selling-name">Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h3>
                  <p className="best-selling-price">140.000đ</p>
                </div>
              </div>
              <div className="best-selling-card">
                <div className="best-selling-badge">Hot</div>
                <div className="best-selling-image">
                  <img src="#" alt="Product Image" />
                </div>
                <div className="best-selling-details">
                  <h3 className="best-selling-name">Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h3>
                  <p className="best-selling-price">140.000đ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="brand-value-section">
            <img src="/images//thuonghieu1.png" alt="Background with Natural Ingredients" className="brand-background" />
            <div className="brand-content">
              <h2 className="brand-title">Giá trị thương hiệu</h2>
              <p className="brand-description">
                Pure Botanica tin rằng vẻ đẹp thật sự đến từ thiên nhiên thuần khiết. Chúng tôi mang đến sản phẩm an lành cho làn da, hòa quyện với sự bền vững và trách nhiệm với môi trường.
              </p>
              <a href="#" className="brand-cta">Tìm hiểu thêm</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}