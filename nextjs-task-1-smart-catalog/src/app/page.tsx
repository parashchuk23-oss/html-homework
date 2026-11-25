import Catalog from "../components/Catalog";

export default function HomePage() {
  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="container header-content">
          <a className="brand" href="./">Smart<span>Catalog</span><i>.</i></a>
          <span className="header-label">NEXT.JS + TYPESCRIPT</span>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> ПРОСТІР РОЗУМНИХ ПОКУПОК</p>
            <h1>Smart Catalog<span>.</span></h1>
            <p className="hero-description">
              Знайди те, що шукаєш. Переглядай добірку товарів,
              шукай за назвою та фільтруй за категорією.
            </p>
            <div className="hero-details">
              <span>✦ 8 товарів</span>
              <span>✦ 4 категорії</span>
              <span>✦ Миттєвий пошук</span>
            </div>
          </div>
          <div className="hero-decoration" aria-hidden="true">
            <div className="deco-circle deco-outer"><div className="deco-circle deco-inner">✳</div></div>
          </div>
        </section>

        <Catalog />
        <footer className="site-footer">Smart Catalog · Навчальний проєкт на Next.js та TypeScript. Товари й ціни демонстраційні.</footer>
      </main>
    </div>
  );
}
