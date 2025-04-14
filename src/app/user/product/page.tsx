"use client";
import styles from "./Product.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/components/product_interface";

interface MenuItem {
  title: string;
  subItems?: string[];
}

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

const getImageUrl = (image: string): string => {
  if (image.startsWith("/")) return image;
  return `/images/${image}`;
};

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3002/products");
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredProducts, currentPage, totalPages]);

  const menuItems: MenuItem[] = [
    {
      title: "Trang điểm",
      subItems: ["Son dưỡng môi", "Son màu không chì", "Tẩy da chết môi", "Kem nền", "Kem má"],
    },
    {
      title: "Chăm sóc da",
      subItems: ["Tẩy trang - rửa mặt", "Toner - xịt khoáng", "Dưỡng da", "Kem chống nắng"],
    },
    {
      title: "Chăm sóc cơ thể",
      subItems: [
        "Xà bông thiên nhiên",
        "Sữa tắm thiên nhiên",
        "Dưỡng thể",
        "Tẩy da chết body",
        "Chăm sóc răng miệng",
      ],
    },
    {
      title: "Chăm sóc tóc",
      subItems: ["Dầu gội", "Dầu xả"],
    },
    {
      title: "Hương thơm",
      subItems: ["Tinh dầu nguyên chất", "Tinh dầu trị liệu", "Nước hoa khô", "Nước hoa dạng xịt"],
    },
    {
      title: "Em bé",
      subItems: ["Tắm em bé", "Chăm sóc bé"],
    },
  ];

  const toggleSubMenu = (title: string) => {
    setOpenSubMenu(openSubMenu === title ? null : title);
  };

  const filterProducts = (subItem: string) => {
    const filtered = products.filter((product) => product.name.includes(subItem));
    setFilteredProducts(filtered.length > 0 ? filtered : products);
    setCurrentPage(1);
  };

  const getRandomProducts = (products: Product[], count: number): Product[] => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const bestSellingProducts = getRandomProducts(products, 4);

  return (
    <div>
      <section className={styles.productBanner}>
        <img src="/images/productBanner.png" alt="Banner" className={styles["banner-image"]} />
      </section>

      <h1 className={styles["product-main-title"]}>Danh sách sản phẩm</h1>

      <div className={styles.containerBox}>
        <aside className={styles.productSidebar}>
          <h3 className={styles["sidebar-title"]}>DANH MỤC SẢN PHẨM</h3>
          <ul className={styles["menu-list"]}>
            {menuItems.map((item) => {
              const isActive = openSubMenu === item.title;
              return (
                <li
                  key={item.title}
                  className={`${styles["menu-list-item"]} ${item.subItems ? styles["sub-menu1"] : ""} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={item.subItems ? () => toggleSubMenu(item.title) : undefined}
                >
                  <span className={styles["menu-title"]}>
                    <i
                      className="fa-solid fa-caret-down"
                      style={{
                        transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
                        color: "#8D5524",
                      }}
                    ></i>{" "}
                    <span style={{ color: isActive ? "#8D5524" : "#357E38" }}>{item.title}</span>
                  </span>

                  {item.subItems && isActive && (
                    <ul className={styles["sub-menu-list"]}>
                      {item.subItems.map((subItem) => (
                        <li
                          key={subItem}
                          className={styles["sub-menu-list-item"]}
                          onClick={() => filterProducts(subItem)}
                        >
                          - {subItem}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </aside>

        <section className={styles.productContainer}>
          <div className={styles.productGrid}>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link
                  href={`/user/detail/${product._id}`}
                  key={product._id}
                  className={`${styles.productItem} ${styles["product-link"]}`}
                >
                  <div>
                    <Image
                      src={getImageUrl(product.images?.[0] || "")}
                      alt={product.name}
                      width={300}
                      height={200}
                      className={styles["product-image"]}
                    />
                    <div className={styles["product-details"]}>
                      <h4 className={styles["product-item-name"]}>{product.name}</h4>
                      <div className={styles["product-card"]}>
                        <p className={styles.price}>{formatPrice(product.price)}</p>
                        <span
                          title="Thêm vào Giỏ Hàng"
                          className={styles.cartIcon}
                        >
                          <i className="fas fa-shopping-cart"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className={styles["no-products"]}>Đang tải sản phẩm...</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className={styles.productPagination}>
              <button
                className={`${styles["page-btn"]} ${currentPage === 1 ? styles.disabled : ""}`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={`page-${index + 1}`}
                  className={`${styles["page-btn"]} ${
                    currentPage === index + 1 ? styles.active : ""
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`${styles["page-btn"]} ${
                  currentPage === totalPages ? styles.disabled : ""
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>

      <div className={styles["best-selling-products"]}>
        <h3 className={styles["slider-title"]}>Có thể bạn sẽ thích</h3>
        <div className={styles["best-selling-grid"]}>
          {bestSellingProducts.length > 0 ? (
            bestSellingProducts.map((product) => (
              <Link
                href={`/user/detail/${product._id}`}
                key={product._id}
                className={styles["best-selling-link"]}
              >
                <div className={styles["best-selling-card"]}>
                  <div className={styles["best-selling-badge"]}>Sale</div>
                  <div className={styles["best-selling-image"]}>
                    <Image
                      src={getImageUrl(product.images?.[0] || "/images/Apple-Pay.png")}
                      alt={product.name}
                      width={200}
                      height={200}
                      className={styles["best-selling-product-image"]}
                    />
                  </div>
                  <div className={styles["best-selling-details"]}>
                    <h3 className={styles["best-selling-product-name"]}>{product.name}</h3>
                    <p className={styles["best-selling-price"]}>{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className={styles["no-products"]}>Đang tải sản phẩm...</p>
          )}
        </div>
      </div>
    </div>
  );
}