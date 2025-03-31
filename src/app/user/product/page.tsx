import "./product.css";

export default function ProductPage() {
    return (
        <div>
            <section className="productBanner">
                <img src="/images/productBanner.png" alt="Banner" />
            </section>
            <h1 className="productTitle">Chăm sóc cơ thể</h1>
            <div className="containerBox">
                {/* DANH MỤC SẢN PHẨM */}
                <aside className="productSidebar">
                    <h3>DANH MỤC SẢN PHẨM</h3>
                    <ul>
                        <li>
                            <i className="fa-solid fa-caret-down" style={{ transform: "rotate(-90deg)" }}></i> Trang điểm
                        </li>
                        <li>
                            <i className="fa-solid fa-caret-down" style={{ transform: "rotate(-90deg)" }}></i> Chăm sóc da
                        </li>
                        <li className="sub-menu1">
                            <i className="fa-solid fa-caret-down"></i> Chăm sóc cơ thể
                            <ul className="sub-menu" >
                                <li>- Xà bông thiên nhiên</li>
                                <li>- Sữa tắm thiên nhiên</li>
                                <li>- Dưỡng thể</li>
                                <li>- Tẩy da chết body</li>
                                <li>- Chăm sóc rạng ngời</li>
                            </ul>
                        </li>   
                        <li>
                            <i className="fa-solid fa-caret-down" style={{ transform: "rotate(-90deg)" }}></i> Chăm sóc tóc
                        </li>
                        <li>
                            <i className="fa-solid fa-caret-down" style={{ transform: "rotate(-90deg)" }}></i> Hương thơm
                        </li>
                        <li>
                            <i className="fa-solid fa-caret-down" style={{ transform: "rotate(-90deg)" }}></i> Mẹ và bé
                        </li>
                    </ul>
                </aside>

                {/* DANH SÁCH SẢN PHẨM */}
                <section className="productContainer">
                    <div className="productGrid">
                        {[...Array(9)].map((_, index) => (
                            <div className="productItem" key={index}>
                                <img src="./images/kemtrangdiem.png" alt="Sản phẩm" />
                                <h4>Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h4>
                                <div className="product-card">
                                    <p className="price">140.000đ</p>
                                    <a href="#">
                                        <i className="fas fa-shopping-cart cartIcon"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="productPagination">
                        <button className="page-btn">&lt;</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">&gt;</button>
                    </div>
                </section>
            </div>

            <div className="best-selling-products">
                <h3 className="SliderTitle">Có thể bạn sẽ thích</h3>
                <div className="best-selling-grid">
                    {[...Array(6)].map((_, index) => (
                        <div className="best-selling-card" key={index}>
                            <div className="best-selling-badge">Sale</div>
                            <div className="best-selling-image">
                                <img src="/images/kemtrangdiem.png" alt="Product /Images" />
                            </div>
                            <div className="best-selling-details">
                                <h3 className="best-selling-name">Kem Trang Điểm Thủy Tinh 3in1 Tích Hợp</h3>
                                <p className="best-selling-price">140.000đ</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
        </div>
    );
}