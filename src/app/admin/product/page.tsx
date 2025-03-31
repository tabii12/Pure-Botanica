import "../product/product.css";

export default function ProductPage() {
    return (
        <div>
            <div className="title_container">
                <h1>SẢN PHẨM</h1>
                <a href="/admin/add_product" className="add-product-btn">Thêm Sản Phẩm +</a>
            </div>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Danh mục</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(4)].map((_, index) => (
                            <tr key={index}>
                                <td><img src="image/kemtrangdiem.png" alt="Sản phẩm 1" width="50" /></td>
                                <td>Kem nghệ dưỡng da</td>
                                <td>Kem dưỡng da</td>
                                <td>200,000₫</td>
                                <td>10</td>
                                <td>
                                    <button className="edit-btn"><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className="delete-btn"><i className="fa-regular fa-trash-can"></i></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="pagination">
                <a href="#" className="page-link">Trước</a>
                <a href="#" className="page-link active">1</a>
                <a href="#" className="page-link">2</a>
                <a href="#" className="page-link">3</a>
                <a href="#" className="page-link">Sau</a>
            </div>
        </div>
    );
}
