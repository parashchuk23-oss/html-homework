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
      {product.originalPrice !== undefined && product.originalPrice > product.price && (
        <span className="sale-badge">Акція</span>
      )}
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
        <div className="price-row">
          <p className="product-price">{priceFormatter.format(product.price)}</p>
          {product.originalPrice !== undefined && product.originalPrice > product.price && (
            <del className="old-price">{priceFormatter.format(product.originalPrice)}</del>
          )}
        </div>
      </div>
    </article>
  );
}
