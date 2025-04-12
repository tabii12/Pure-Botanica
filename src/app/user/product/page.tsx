"use client";
import "./product.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

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
      <section className="productBanner">
        <img src="/images/productBanner.png" alt="Banner" />
      </section>

      <h1 className="productTitle">Danh sách sản phẩm</h1>

      <div className="containerBox">
        <aside className="productSidebar">
          <h3>DANH MỤC SẢN PHẨM</h3>
          <ul className="menu">
            {menuItems.map((item) => {
              const isActive = openSubMenu === item.title;
              return (
                <li
                  key={item.title}
                  className={`menu-item ${item.subItems ? "sub-menu1" : ""} ${isActive ? "active" : ""}`}
                  onClick={item.subItems ? () => toggleSubMenu(item.title) : undefined}
                >
                  <span className="menu-title">
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
                    <ul className="sub-menu">
                      {item.subItems.map((subItem) => (
                        <li key={subItem} onClick={() => filterProducts(subItem)}>
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

        <section className="productContainer max-w-6xl mx-auto py-8">
          <div className="productGrid ">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <Link
                  href={`/user/detail/${product._id}`}
                  key={product._id}
                  className="productItem bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <div>
                    <Image
                      src={getImageUrl(product.images?.[0] || "")}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800">{product.name}</h4>
                      <div className="product-card flex justify-between items-center mt-2">
                        <p className="price text-red-500 font-bold">{formatPrice(product.price)}</p>
                        <span title="Thêm vào Giỏ Hàng" className="text-gray-600 hover:text-green-500 cursor-pointer">
                          <i className="fas fa-shopping-cart cartIcon"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-center col-span-full">Đang tải sản phẩm...</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="productPagination flex justify-center mt-8 space-x-2">
              <button
                className="page-btn px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={`page-${index + 1}`}
                  className={`page-btn px-4 py-2 ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  } rounded`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="page-btn px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                &gt;
              </button>
            </div>
          )}
        </section>
      </div>

      <div className="best-selling-products">
        <h3 className="SliderTitle">Có thể bạn sẽ thích</h3>
        <div className="best-selling-grid">
          {bestSellingProducts.length > 0 ? (
            bestSellingProducts.map((product) => (
              <a href={`/user/detail/${product._id}`} key={product._id}>
                <div className="best-selling-card">
                  <div className="best-selling-badge">Sale</div>
                  <div className="best-selling-image">
                    <Image
                      src={getImageUrl(product.images?.[0] || "/images/Apple-Pay.png")}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="best-selling-details">
                    <h3 className="best-selling-name">{product.name}</h3>
                    <p className="best-selling-price">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>Đang tải sản phẩm...</p>
          )}
        </div>
      </div>
    </div>
  );
}
