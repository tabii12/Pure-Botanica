"use client";

import "./login.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
    
        try {
            const res = await fetch("https://db-pure-bonanica.onrender.com/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await res.json();
            console.log("API Response:", data); // Kiểm tra dữ liệu trả về
    
            if (!res.ok) {
                setError(data.message || "Đăng nhập thất bại");
                return;
            }
    
            // Lưu token và role vào localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role); // Lưu role từ API
    
            // Chuyển hướng theo quyền
            if (data.user.role === "admin") {
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
                <h2><strong>ĐĂNG NHẬP</strong></h2>

                {/* Nút Đăng nhập với Google */}
                <button className="google-btn">
                    <img src="/images/icons8-google-48.png" alt="Google Logo" /> Đăng nhập với Google 
                </button>

                <div className="divider">
                    <hr />
                    <span>Đăng nhập bằng tài khoản</span>
                    <hr />
                </div>

                {/* Form Đăng Nhập */}
                <form action="#" method="post" onSubmit={handleSubmit}>
                    <input type="email" placeholder="Myname@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />   
                    <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required />

                    <div className="forgot-password">
                        <a href="#">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="submit-btn">ĐĂNG NHẬP</button>
                    {error && <p className="error-message">{error}</p>}

                    <p className="switch-form">Chưa có tài khoản? <a href="register.html">Đăng ký</a></p>
                </form>
            </div>
        </div>
    );
}
