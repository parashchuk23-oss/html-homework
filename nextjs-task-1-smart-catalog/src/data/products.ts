import type { Product } from "../types/product";

// Демонстраційні товари. Це не інтернет-магазин: купівля не реалізована.
export const products: Product[] = [
  { id: 1, name: "Бездротові навушники", price: 1899, category: "Електроніка", inStock: true, emoji: "🎧", description: "Компактні навушники для музики та дзвінків." },
  { id: 2, name: "Розумна лампа", price: 1190, category: "Дім", inStock: true, emoji: "💡", description: "Регульоване освітлення для затишку." },
  { id: 3, name: "Фітнес-браслет", price: 2499, category: "Спорт", inStock: false, emoji: "⌚", description: "Трекер активності для щоденних тренувань." },
  { id: 4, name: "Рюкзак City", price: 1590, category: "Аксесуари", inStock: true, emoji: "🎒", description: "Місткий рюкзак для роботи й подорожей." },
  { id: 5, name: "Bluetooth-колонка", price: 2290, category: "Електроніка", inStock: true, emoji: "🔊", description: "Портативний звук для дому та прогулянок." },
  { id: 6, name: "Термочашка", price: 690, category: "Дім", inStock: false, emoji: "☕", description: "Зберігає напої теплими під час поїздок." },
  { id: 7, name: "Килимок для йоги", price: 890, category: "Спорт", inStock: true, emoji: "🧘", description: "Комфортна поверхня для занять." },
  { id: 8, name: "Сонцезахисні окуляри", price: 1290, category: "Аксесуари", inStock: true, emoji: "🕶️", description: "Легкі окуляри для сонячних днів." },
];
