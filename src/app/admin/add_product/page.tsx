import "./add_product.css";

export default function adproduct() {
    return (
        <div className="container">
            <h1>Thêm sản phẩm</h1>

            <form>
                <div className="form-group">
                    <label htmlFor="product-name">Tên sản phẩm</label>
                    <input type="text" id="product-name" placeholder="" />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Danh mục</label>
                    <select id="category">
                        <option value="" disabled></option>
                    </select>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="price">Giá</label>
                            <input type="text" id="price" placeholder="Giá sản phẩm" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="promo-price">Giá khuyến mại (nếu có)</label>
                            <input type="text" id="promo-price" placeholder="Giá ưu đãi" />
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Mô tả sản phẩm</label>
                    <textarea id="description"></textarea>
                </div>

                <div className="color-options">
                    <div className="row">
                        <div className="col">
                            <div className="color-group">
                                <div className="color-group-title">Góc Hình Chính</div>
                                <div className="color-buttons">
                                    <button type="button" className="color-button">Chọn tệp</button>
                                    <span>Không có tệp nào được chọn</span>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="color-group">
                                <div className="color-group-title">Góc Nhìn 2</div>
                                <div className="color-buttons">
                                    <button type="button" className="color-button">Chọn tệp</button>
                                    <span>Không có tệp nào được chọn</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <div className="color-group">
                                <div className="color-group-title">Góc Nhìn 3</div>
                                <div className="color-buttons">
                                    <button type="button" className="color-button">Chọn tệp</button>
                                    <span>Không có tệp nào được chọn</span>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="color-group">
                                <div className="color-group-title">Góc Nhìn 4</div>
                                <div className="color-buttons">
                                    <button type="button" className="color-button">Chọn tệp</button>
                                    <span>Không có tệp nào được chọn</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="action-buttons">
                    <button type="submit" className="btn-save">Lưu</button>
                    <button type="button" className="btn-cancel">Hủy</button>
                </div>
            </form>
        </div>
    );
}
