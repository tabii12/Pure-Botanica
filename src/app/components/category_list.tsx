import { Category } from "./category_interface";
import { SubCategory } from "./sub_category_interface";

export default function CategoryList({ categories, subCategories }: { categories: Category[]; subCategories: SubCategory[] }) {
    return (
        <div className="category-list">
            {categories.map((category) => (
                <div key={category.id} className="category-itemm">
                    <h2>{category.name}</h2>
                    <ul>
                        {subCategories
                            .filter((subCategory) => subCategory.category === category.id)
                            .map((subCategory) => (
                                <li key={subCategory.id}>{subCategory.name}</li>
                            ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}