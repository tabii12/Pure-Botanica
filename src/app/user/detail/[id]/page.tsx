"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

// Hàm định dạng giá tiền
const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
};

// Chuẩn hóa đường dẫn ảnh
const getImageUrl = (image: string): string => {
  if (image.startsWith("/")) return image;
  return `/images/${image}`;
};

export default function DetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://db-pure-bonanica.onrender.com/products/${id}`);
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

  if (loading) return <p className="text-center py-10">Đang tải chi tiết sản phẩm...</p>;

  if (!product) return <p className="text-center py-10">Không tìm thấy sản phẩm.</p>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={getImageUrl(product.images?.[0] || "")}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-auto object-cover rounded"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-red-500 font-semibold mt-4">{formatPrice(product.price)}</p>
          <p className="text-gray-700 mt-6">{product.description || "Chưa có mô tả cho sản phẩm này."}</p>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
            <i className="fas fa-shopping-cart mr-2"></i> Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
