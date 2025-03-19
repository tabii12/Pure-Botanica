import { Category } from "./categoryinterface";

export default function CategoryList(props: { title: string, products: Category[] }) {
    return (
        <div>
            <h1>{props.title}</h1>
            <div className="category-list">
                {
                    props.products.map((product: Category) => 
                    <div key={product.id}>
                        <img src={product.image} alt={product.name} />
                        <h3>{product.name}</h3>
                    </div>
                    )
                }
            </div>
        </div>
    );
}