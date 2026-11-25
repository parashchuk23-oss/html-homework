"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import type { ProductCategory } from "../types/product";

const categories: ProductCategory[] = ["Електроніка", "Дім", "Спорт", "Аксесуари"];

export default function Catalog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ProductCategory | "Усі">("Усі");

  // Спочатку шукаємо в назві, потім застосовуємо фільтр категорій.
  // Початковий масив products залишається незмінним.
  const visibleProducts = products.filter((product) => {
    const matchesName = product.name.toLocaleLowerCase("uk-UA")
      .includes(search.trim().toLocaleLowerCase("uk-UA"));
    const matchesCategory = category === "Усі" || product.category === category;
    return matchesName && matchesCategory;
  });

  return (
    <>
      <section className="toolbar" aria-label="Пошук та фільтрування товарів">
        <div className="search-group">
          <label htmlFor="product-search">Пошук за назвою</label>
          <div className="search-field">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="product-search"
              type="search"
              placeholder="Наприклад, навушники"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="category-group">
          <label htmlFor="category-select">Категорія</label>
          <select
            id="category-select"
            value={category}
            onChange={(event) => setCategory(event.target.value as ProductCategory | "Усі")}
          >
            <option value="Усі">Усі категорії</option>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </div>
      </section>

      <section className="catalog-section" aria-labelledby="catalog-heading">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">НАША ДОБІРКА</p>
            <h2 id="catalog-heading">Каталог товарів</h2>
          </div>
          <span className="items-count" aria-live="polite">Знайдено: {visibleProducts.length}</span>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="products-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state" role="status">
            <span aria-hidden="true">🔎</span>
            <h3>Товарів не знайдено</h3>
            <p>Спробуй змінити назву в пошуку або вибрати іншу категорію.</p>
            <button type="button" onClick={() => { setSearch(""); setCategory("Усі"); }}>
              Скинути фільтри
            </button>
          </div>
        )}
      </section>
    </>
  );
}
