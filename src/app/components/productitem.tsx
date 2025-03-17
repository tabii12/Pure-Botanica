import { Product } from '../components/productinterface';

export default function ProductItem({product}: {product: Product}){
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
        </div>
    );
}