import Image from "next/image";
import styles from "./page.module.css";
import ProductList from "./components/productlist";
import CategoryList from "./components/categorylist";
import { Product } from "./components/productinterface";
import { Category } from "./components/categoryinterface";

export default async function Home() {
  const title = "Product List";

  const products = await getProducts("http://localhost:3001/products");
  const category = await getCategories("http://localhost:3001/category");

  return (
    <div>
      <main className={styles.main}>
      <div className={styles.banner}>this is banner</div>
      <CategoryList title="Category List" products={category} />
      <ProductList props={{ title: title, products: products }} />
      </main>
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

async function getCategories(url: string){
  let res = await fetch(url);
  let data = await res.json();
  let categories: Category[] = data.map((category:any) => {
    return {
      id: category.id,
      name: category.name,
      image: category.image,
    };
  });
  return categories;
}