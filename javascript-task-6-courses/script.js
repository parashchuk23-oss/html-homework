"use strict";

// Початковий каталог онлайн-курсів.
const courses = [
  { id: 1, title: "Python Basics", category: "Programming", price: 1200, students: 150 },
  { id: 2, title: "UI/UX Design", category: "Design", price: 1800, students: 90 },
  { id: 3, title: "JavaScript", category: "Programming", price: 1500, students: 200 },
  { id: 4, title: "Photoshop", category: "Design", price: 900, students: 110 },
  { id: 5, title: "Data Science", category: "Programming", price: 2500, students: 75 }
];

// 1. filter() повертає новий масив із курсами категорії Programming.
const programmingCourses = courses.filter((course) => course.category === "Programming");
console.log("1. Курси категорії Programming:");
console.table(programmingCourses);

// 2. map() перетворює кожен об'єкт на рядок із назвою та ціною.
const courseNamesWithPrices = courses.map((course) => course.title + " — " + course.price + " грн");
console.log("\n2. Назви курсів із цінами:");
console.log(courseNamesWithPrices);

// 3. find() повертає перший курс із id = 4 (або undefined, якщо не знайде).
const courseWithId4 = courses.find((course) => course.id === 4);
console.log("\n3. Курс із id = 4:");
console.log(courseWithId4);

// 4. sort() змінює масив, тому спочатку створюємо копію через [...courses].
// Сортуємо від найбільшої кількості студентів до найменшої.
const sortedByStudents = [...courses].sort((a, b) => b.students - a.students);
console.log("\n4. Курси за кількістю студентів (спадання):");
console.table(sortedByStudents);

// 5. Функція обчислює середню ціну за допомогою for...of.
function calculateAveragePrice(courses) {
  // Якщо курсів немає, не ділимо на нуль.
  if (courses.length === 0) {
    return 0;
  }

  let totalPrice = 0;

  for (const course of courses) {
    totalPrice += course.price;
  }

  return totalPrice / courses.length;
}

console.log("\n5. Середня ціна всіх курсів:");
console.log(calculateAveragePrice(courses) + " грн");

// Перевіряємо, що порядок вихідного масиву залишився незмінним.
console.log("\nПочатковий порядок id (не змінений сортуванням):");
console.log(courses.map((course) => course.id));
