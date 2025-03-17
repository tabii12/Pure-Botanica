import { Product } from "../components/productinterface"
import ProductItem from "../components/productitem"

export default function ProductList({prop}:{prop: {products: Product[], title: string}}){
    
    let products: Product[] = [
        {
            id: 1,
            name: 'Product 1',
            price: 100,
            description: 'Description 1',
            image: 'https://via.placeholder.com/150',
            category: 'Category 1'
        },
        {
            id: 2,
            name: 'Product 2',
            price: 200,
            description: 'Description 2',
            image: 'https://via.placeholder.com/150',
            category: 'Category 2'
        }
    ]
    return (
        <div>
            <h1>{prop.title}</h1>
            {products.map((product) => (
                <ProductItem product = {product} key = {product.id}/>
            ))}
        </div>
    )
}