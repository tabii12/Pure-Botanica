import "./login.css";

export default function LoginPage() {
    return (
        <div className="container">
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
                <form action="#" method="post">
                    <input type="text" placeholder="Myname@gmail.com / SĐT" required /><br />   
                    <input type="password" placeholder="●●●●●●●" required />

                    <div className="forgot-password">
                        <a href="#">Quên mật khẩu?</a>
                    </div>

                    <button type="submit" className="submit-btn">ĐĂNG NHẬP</button>

                    <p className="switch-form">Chưa có tài khoản? <a href="register.html">Đăng ký</a></p>
                </form>
            </div>
        </div>
    );
}
