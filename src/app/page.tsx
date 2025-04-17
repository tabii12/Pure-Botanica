"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Html } from "next/document";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Chuyển hướng đến /user
    router.push("/user");
  }, [router]);

  return  (
    <body>
    <html lang="vi">
     <h1>đang chuyển trang</h1>
    </html>
    </body>
  );
}