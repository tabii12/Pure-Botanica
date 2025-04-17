"use client";
import Link from "next/link";
import { jwtDecode } from "jwt-decode"; // Named import
import "./login.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Khai báo kiểu tùy chỉnh cho payload của token
interface CustomJwtPayload {
    id?: string;
    email?: string;
    role?: string;
    iat?: number;
    exp?: number;
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("https://api-zeal.onrender.com/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (!res.ok) {
                setError(data.message || "Đăng nhập thất bại");
                return;
            }

            // Giải mã token với kiểu tùy chỉnh
            const decodedToken: CustomJwtPayload = jwtDecode(data.token);
            const userRole = decodedToken.role;
            const userEmail = decodedToken.email;

            if (!userRole) {
                setError("Không tìm thấy thông tin vai trò người dùng");
                return;
            }

            // Lưu thông tin vào localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", userRole);
            localStorage.setItem("email", userEmail || "");

            // Chuyển hướng theo quyền
            if (userRole === "admin") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        } catch (err: any) {
            console.error("Lỗi đăng nhập:", err);
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="containerrr">
            <div className="form-box">
                <h2>
                    <strong>ĐĂNG NHẬP</strong>
                </h2>

                <button className="google-btn">
                    <img src="/images/icons8-google-48.png" alt="Google Logo" /> Đăng nhập với Google
                </button>

                <div className="divider">
                    <hr />
                    <span>Đăng nhập bằng tài khoản</span>
                    <hr />
                </div>

                <form action="#" method="post" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Myname@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="forgot-password">
                        <a href="#">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="submit-btn">ĐĂNG NHẬP</button>
                    {error && <p className="error-message">{error}</p>}

                    <p className="switch-form">
                        Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}