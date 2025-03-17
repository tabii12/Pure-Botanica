import Image from "next/image";
import styles from "./page.module.css";
import ProductList from "./components/productlist";

export default function Home() {
  const title = "Product List";

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "Description 1",
      image: "https://via.placeholder.com/150",
      category: "Category 1",
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      description: "Description 2",
      image: "https://via.placeholder.com/150",
      category: "Category 2",
    },
  ];

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ProductList products={products} title={title} />
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}
