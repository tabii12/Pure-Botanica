"use client";

import "../user/user.css";

export default function userPage() {
    return (
        <>
            <div className="title_container">
                <h1>Admin</h1>
                <a href="index.php?page=add">Thêm Admin Mới +</a>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Họ Tên</th>
                            <th>Chức vụ</th>
                            <th>E-Mail</th>
                            <th>SDT</th>
                            <th>Hành động</th> {/* Thêm cột Hành động */}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Dinh The Nhan</td>
                            <td>Admin</td>
                            <td>nhandtps40210@gmail.com</td>
                            <td>0342031354</td>
                            <td>
                                <a href="#" className="action-btn">
                                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>

                                <form method="POST" action="index.php?page=user" 
                                    onSubmit={() => confirm('Bạn có chắc chắn muốn xóa không?')}>
                                    <input type="hidden" name="delete_id" value="" />
                                    <button className="action-btn" type="submit">
                                        <i className="fa-regular fa-trash-can"></i>
                                    </button>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
