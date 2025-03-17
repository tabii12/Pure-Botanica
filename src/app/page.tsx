import Image from "next/image";
import styles from "./page.module.css";
import ProductList from "./components/productlist";
import { Product } from "./components/productinterface";

export default async function Home() {
  const title = "Product List";

  const products = await getProducts("http://localhost:3001/products");

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <ProductList props={{ title: title, products: products }} />
      </main>
      <footer className={styles.footer}>footer</footer>
    </div>
  );
}

async function getProducts(url: string){
  let res = await fetch(url);
  let data = await res.json();
  let products: Product[] = data.map((product:any) => {
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    };
  });
  return products;
}