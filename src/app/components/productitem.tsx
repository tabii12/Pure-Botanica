import { Product } from '../components/productinterface';

export default function ProductItem({product}: {product: Product}){
    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} />
            <h1>{product.name}</h1>
            <p className="price">{product.price} VND</p>
            <p>{product.description}</p>
        </div>
    );
}
