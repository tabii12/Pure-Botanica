import "../order/order.css";

export default function OrderPage() {
    return (
        <div className="oder-container">
        <div className="title">
            <h1>Danh Sách Oder</h1>
            </div>
        <div className="table-container">
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Địa Chỉ</th>
                        <th>Ngày</th>
                        <th>Startus</th>
                       
                    </tr>
                </thead>
                <tbody>
                            <tr>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">1</a></td> 
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Dinh The Nhan</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">391 To Ky</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">10-03-2025</a></td>
                                <td><div className="table-status-success">Da Giao</div></td>
                            </tr>
                            <tr>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">2</a></td> 
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Nguyen Van Khanh</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Tan Son</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">23-03-2025</a></td>
                                <td><div className="table-status-fail">Dang Giao</div></td>
                            </tr>
                            <tr>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">3</a></td> 
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Pham Nguyen Hai Trieu</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Muong Thanh</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">25-03-2025</a></td>
                                <td><div className="table-status-fail">Dang Giao</div></td>
                            </tr>
                            <tr>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">4</a></td> 
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Truong Viet Huy Bao</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">Dong Nai</a></td>
                                <td><a href="index.php?page=oderdetail&id_don_hang='.$infor['id'].'">15-03-2025</a></td>
                                <td><div className="table-status-success">Da Giao</div></td>
                            </tr>
                </tbody>
            </table>
        </div>
</div>
    );
}
