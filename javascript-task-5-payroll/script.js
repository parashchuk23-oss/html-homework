"use strict";

// Початкові дані — працівники, відпрацьовані години та ставка за годину.
const employees = [
  { name: "Олег", hours: 160, rate: 200 },
  { name: "Марія", hours: 145, rate: 250 },
  { name: "Іван", hours: 180, rate: 180 },
  { name: "Анна", hours: 170, rate: 220 }
];

// Обчислює зарплату одного працівника.
// Якщо відпрацьовано понад 160 годин, додає 10% до всієї зарплати.
function calculateSalary(hours, rate) {
  const baseSalary = hours * rate;

  if (hours > 160) {
    return baseSalary * 1.10;
  }

  return baseSalary;
}

// Повертає загальні витрати на зарплати всіх працівників.
function calculatePayroll(employees) {
  let total = 0;

  for (const employee of employees) {
    total += calculateSalary(employee.hours, employee.rate);
  }

  return total;
}

// Цикл for...of перебирає кожного працівника та виводить його зарплату.
for (const employee of employees) {
  const salary = calculateSalary(employee.hours, employee.rate);
  const bonusLabel = employee.hours > 160 ? " (з бонусом)" : "";

  console.log(employee.name + ": " + salary + " грн" + bonusLabel);
}

// Загальна сума враховує бонуси всіх працівників.
console.log("Загальні витрати: " + calculatePayroll(employees) + " грн");
