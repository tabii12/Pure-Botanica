"use client";

import "./register.css";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp");
            return;
        }

        try {
            const res = await fetch("https://api-zeal.onrender.com/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, phone, password }),
            });

            const data = await res.json();
            console.log("Register API Response:", data);

            if (!res.ok) {
                setError(data.message || "Đăng ký thất bại");
                return;
            }

            // Lưu thông tin người dùng
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            localStorage.setItem("email", data.user.email);

            // Điều hướng theo role
            if (data.user.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/user");
            }
        } catch (err: any) {
            console.error("Lỗi đăng ký:", err);
            setError(err.message || "Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="containerrr">
            <div className="form-box">
                <h2><strong>ĐĂNG KÝ</strong></h2>

                <button className="google-btn">
                    <img src="/images/icons8-google-48.png" alt="Google Logo" /> Đăng ký với Google
                </button>

                <div className="divider">
                    <hr />
                    <span>Hoặc đăng ký bằng tài khoản</span>
                    <hr />
                </div>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Họ và tên"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <br />
                    <input
                        type="tel"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                    <br />
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="submit-btn">ĐĂNG KÝ</button>
                    {error && <p className="error-message">{error}</p>}

                    <p className="switch-form">
                        Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
