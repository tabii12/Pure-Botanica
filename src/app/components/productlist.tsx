import { Product } from "./productinterface";
import ProductItem from "./productitem";

export default function ProductList(
    {props}: {props: {products: Product[]; title: string}}
){
    return (
        <div>
            <h1>{props.title}</h1>
            <div className="product-list">
            {
                props.products.map((product: Product) => 
                <ProductItem key={product.id} product={product} />
                )
            }
            </div>
        </div>
    );
}