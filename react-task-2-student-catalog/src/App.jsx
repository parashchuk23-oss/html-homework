import { useState } from "react";
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
  // Два незалежні стани: видимість списку й обраний курс.
  const [showStudents, setShowStudents] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState("all");

  // Список курсів отримуємо з даних, щоб не дублювати назви вручну.
  const courses = [...new Set(students.map((student) => student.course))];

  // Фільтр не змінює вихідний масив students.
  const filteredStudents = students.filter(
    (student) => selectedCourse === "all" || student.course === selectedCourse
  );

  // Якщо список прихований, видимих карток рівно нуль.
  const visibleStudents = showStudents ? filteredStudents : [];

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
            <span className="student-count" aria-live="polite">Показано: {visibleStudents.length} з {students.length}</span>
          </div>

          <div className="catalog-controls">
            <div className="filter-field">
              <label htmlFor="course-filter">Фільтр за курсом</label>
              <select
                id="course-filter"
                value={selectedCourse}
                onChange={(event) => setSelectedCourse(event.target.value)}
              >
                <option value="all">Усі курси</option>
                {courses.map((course) => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="toggle-button"
              onClick={() => setShowStudents((current) => !current)}
              aria-expanded={showStudents}
              aria-controls="students-list"
            >
              {showStudents ? "Приховати студентів" : "Показати студентів"}
            </button>
          </div>

          {showStudents && visibleStudents.length === 0 && (
            <p className="empty-students">За обраним курсом студентів не знайдено.</p>
          )}
          {!showStudents && (
            <p className="empty-students">Список студентів приховано. Натисни «Показати студентів».</p>
          )}

          <div className="students-grid" id="students-list">
            {visibleStudents.map((student) => (
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
