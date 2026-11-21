import StudentCard from "./components/StudentCard.jsx";
import Counter from "./components/Counter.jsx";

// Навчальні дані: імена, вік і курс кожного студента.
const students = [
  { id: 1, name: "Олена Коваль", age: 21, course: "JavaScript та React", initials: "ОК", tone: "mint" },
  { id: 2, name: "Максим Бондар", age: 23, course: "Python Basics", initials: "МБ", tone: "blue" },
  { id: 3, name: "Софія Мельник", age: 20, course: "UI/UX Design", initials: "СМ", tone: "peach" },
  { id: 4, name: "Андрій Шевченко", age: 24, course: "Data Science", initials: "АШ", tone: "lilac" }
];

function App() {
  return (
    <div className="site">
      <header className="site-header">
        <div className="container topbar">
          <a className="logo" href="./" aria-label="StudentHub — головна">Student<span>Hub</span><b>.</b></a>
          <span className="topbar-label">REACT + VITE / НАВЧАЛЬНИЙ ПРОЄКТ</span>
        </div>
      </header>

      <main className="container main-content">
        <div className="intro">
          <p className="eyebrow"><span className="eyebrow-dot"></span> СТУДЕНТСЬКИЙ ПРОСТІР</p>
          <h1>Знайомся з нашими <span>студентами.</span></h1>
          <p className="intro-description">Чотири студенти, різні напрямки навчання та один простий React-проєкт.</p>
        </div>

        <section className="catalog-section" aria-labelledby="students-heading">
          <div className="section-heading">
            <div>
              <p className="section-kicker">КАТАЛОГ</p>
              <h2 id="students-heading">Наші студенти</h2>
            </div>
            <span className="student-count">{students.length} студенти</span>
          </div>

          <div className="students-grid">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                name={student.name}
                age={student.age}
                course={student.course}
                initials={student.initials}
                tone={student.tone}
              />
            ))}
          </div>
        </section>

        <Counter />

        <footer className="footer">StudentHub · React Components · Props · useState</footer>
      </main>
    </div>
  );
}

export default App;
