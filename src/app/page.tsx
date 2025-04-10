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

  return null; // Không cần render gì trên trang này
}