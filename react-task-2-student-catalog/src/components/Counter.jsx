import { useState } from "react";

// useState зберігає кількість відвідувань у стані компонента.
function Counter() {
  const [visits, setVisits] = useState(0);

  // React автоматично оновлює число на екрані після зміни стану.
  function addVisit() {
    setVisits((previousVisits) => previousVisits + 1);
  }

  function resetVisits() {
    setVisits(0);
  }

  return (
    <section className="attendance-panel" aria-labelledby="counter-heading">
      <div className="attendance-copy">
        <span className="section-kicker">ОБЛІК ВІДВІДУВАНЬ</span>
        <h2 id="counter-heading">Лічильник відвідувань</h2>
        <p>Кожне натискання кнопки означає ще одне відвідування заняття.</p>
      </div>

      <div className="counter-area">
        <div className="counter-value" aria-live="polite" aria-atomic="true">
          <span>{visits}</span>
          <small>відвідувань</small>
        </div>
        <div className="counter-actions">
          <button type="button" className="button button-primary" onClick={addVisit}>
            + Додати відвідування
          </button>
          <button type="button" className="button button-outline" onClick={resetVisits}>
            Скинути
          </button>
        </div>
      </div>
    </section>
  );
}

export default Counter;
