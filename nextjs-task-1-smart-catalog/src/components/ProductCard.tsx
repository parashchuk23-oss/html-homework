import type { Product } from "../types/product";

interface ProductCardProps {
  product: Product;
}

const priceFormatter = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH",
  maximumFractionDigits: 0,
});

// Окремий компонент: отримує товар через props і показує його дані.
export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-visual" aria-hidden="true">
        <span>{product.emoji}</span>
      </div>
      <div className="product-body">
        <div className="product-topline">
          <span className="category-tag">{product.category}</span>
          <span className={product.inStock ? "stock in-stock" : "stock out-of-stock"}>
            <span className="status-dot" aria-hidden="true" />
            {product.inStock ? "В наявності" : "Немає в наявності"}
          </span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">{priceFormatter.format(product.price)}</p>
      </div>
    </article>
  );
}
