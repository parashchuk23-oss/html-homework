// Компонент StudentCard отримує дані від App через props.
// Один компонент використовується для кожного студента.
function StudentCard({ name, age, course, initials, tone }) {
  return (
    <article className="student-card">
      <div className={"student-avatar avatar-" + tone} aria-hidden="true">{initials}</div>
      <div className="student-info">
        <h3>{name}</h3>
        <p className="student-meta">Вік: <strong>{age} роки</strong></p>
        <div className="student-course">
          <span className="course-label">КУРС НАВЧАННЯ</span>
          <span className="course-name">{course}</span>
        </div>
      </div>
    </article>
  );
}

export default StudentCard;
