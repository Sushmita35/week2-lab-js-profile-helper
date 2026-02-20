/* =====================================================
   WEEK 2 LAB — STUDENT PROFILE HELPER
   JavaScript Foundations + DOM + Arrays + Events
   ===================================================== */

/* ===============================
   PART 1 — Basic Console Usage
   =============================== */
document.addEventListener('DOMContentLoaded', () => {

// Confirms the script is connected properly
console.log('Week 2 lab loaded successfully!');

// Different console message levels
console.info('Info message example');
console.warn('Warning message example');
console.error('Error message example');


/* ===============================
   PART 2 — Console Power Tools
   =============================== */

// console.table() displays array of objects clearly
const demo = [
  { name: 'Asha', country: 'Nepal', age: 20 },
  { name: 'Rafi', country: 'Bangladesh', age: 22 }
];

console.table(demo);

// console.assert() checks a condition
const ageValue = Number('not-a-number');
console.assert(Number.isFinite(ageValue), 'Age must be a number');

// console.time() measures performance
console.time('loop');
let total = 0;
for (let i = 0; i < 1000000; i++) {
  total += i;
}
console.timeEnd('loop');


/* ===============================
   PART 3 — Variables & Types
   =============================== */

// const is used by default (cannot be reassigned)
const moduleCode = 'CTEC3705';
const lesson = 'Week 2: JavaScript Foundations';
const isLab = true;
const room = 101;

// Show data types
console.log(typeof moduleCode); // string
console.log(typeof lesson);     // string
console.log(typeof isLab);      // boolean
console.log(typeof room);       // number

// let allows reassignment
let counter = 0;
counter++;
console.log(counter);
counter++;
console.log(counter);
counter++;
console.log(counter);

// Template literal + DOM update
const pageTitle = document.querySelector('#pageTitle');
pageTitle.textContent = `${moduleCode} — ${lesson}`;


/* ===============================
   PART 4 — Data Model
   =============================== */

// Array that will store student objects
const students = [];


/* ===============================
   PART 5 — DOM Element Selection
   =============================== */

const nameInput = document.querySelector('#nameInput');
const countryInput = document.querySelector('#countryInput');
const ageInput = document.querySelector('#ageInput');
const skillsInput = document.querySelector('#skillsInput');

const addBtn = document.querySelector('#addBtn');
const clearBtn = document.querySelector('#clearBtn');
const showAllBtn = document.querySelector('#showAllBtn');
const filterBtn = document.querySelector('#filterBtn');
const randomBtn = document.querySelector('#randomBtn');
const avgBtn = document.querySelector('#avgBtn');
const resetBtn = document.querySelector('#resetBtn');

const formMsg = document.querySelector('#formMsg');
const summary = document.querySelector('#summary');


/* ===============================
   PART 6 — Render Function
   Uses for...of loop
   =============================== */

function renderStudentList(list) {
  const ul = document.querySelector('#studentList');

  // Prevent duplication
  ul.innerHTML = '';

  for (const student of list) {
    const li = document.createElement('li');

    li.textContent =
      `${student.name} (${student.country}) — age ${student.age} — skills: ${student.skills.join(', ')}`;

    ul.appendChild(li);
  }
}


/* ===============================
   PART 7 — Add Student Event
   =============================== */

addBtn.addEventListener('click', () => {

  // Read and clean input values
  const name = nameInput.value.trim();
  const country = countryInput.value;
  const age = Number(ageInput.value);

  // Convert comma string into clean array
  const skillsArr = skillsInput.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  /* ---------- VALIDATION ---------- */

  if (name === '') {
    formMsg.textContent = 'Name is required.';
    return;
  }

  if (country === '') {
    formMsg.textContent = 'Please select a country.';
    return;
  }

  if (!Number.isFinite(age) || age < 0) {
    formMsg.textContent = 'Age must be a valid number ≥ 0.';
    return;
  }

  /* ---------- CREATE OBJECT ---------- */

  const student = {
    name,
    country,
    age,
    skills: skillsArr
  };

  // Demonstration of bracket notation
  student['full name'] = student.name;

  // Store inside array
  students.push(student);

  // Render updated list
  renderStudentList(students);

  // Ternary operator example
  formMsg.textContent =
    skillsArr.length >= 3
      ? 'Student added with strong skill set!'
      : 'Student added successfully.';
});


/* ===============================
   PART 8 — Clear Form
   

clearBtn.addEventListener('click', () => {
  nameInput.value = '';
  countryInput.value = '';
  ageInput.value = '';
  skillsInput.value = '';
  formMsg.textContent = 'Form cleared.';
});


/* ===============================
   PART 9 — Show All Students
   =============================== */

showAllBtn.addEventListener('click', () => {
  renderStudentList(students);
  summary.textContent = `Total students: ${students.length}`;
});


/* ===============================
   PART 10 — Filter (Nepal/Bangladesh)
   Uses Array.filter()
   =============================== */

filterBtn.addEventListener('click', () => {

  const filtered = students.filter(
    s => s.country === 'Nepal' || s.country === 'Bangladesh'
  );

  renderStudentList(filtered);
  summary.textContent = `Filtered count: ${filtered.length}`;
});


/* ===============================
   PART 11 — Average Age
   =============================== */

avgBtn.addEventListener('click', () => {

  if (students.length === 0) {
    summary.textContent = 'No students to calculate average.';
    return;
  }

  let totalAge = 0;

  for (const s of students) {
    totalAge += s.age;
  }

  const avg = (totalAge / students.length).toFixed(1);

  summary.textContent = `Average age: ${avg}`;
});


/* ===============================
   PART 12 — Random Student + switch
   =============================== */

randomBtn.addEventListener('click', () => {

  if (students.length === 0) {
    summary.textContent = 'No students available.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * students.length);
  const student = students[randomIndex];

  let greeting;

  // switch statement example
  switch (student.country) {
    case 'Nepal':
      greeting = 'Namaste';
      break;
    case 'Bangladesh':
      greeting = 'Assalamu Alaikum';
      break;
    case 'Denmark':
      greeting = 'Hej';
      break;
    default:
      greeting = 'Hello';
  }

  summary.textContent = `${greeting}, ${student.name}!`;
});


/* ===============================
   PART 13 — Reset List (confirm)
   =============================== */

resetBtn.addEventListener('click', () => {

  const confirmed = confirm('Are you sure you want to reset the list?');

  if (confirmed) {
    students.length = 0; // Clear array
    renderStudentList(students);
    summary.textContent = 'Student list reset.';
  }
});


/* ===============================
   PART 14 — Array Methods Demo
   =============================== */

// map() example
function showUppercaseNames() {
  const upperNames = students.map(s => s.name.toUpperCase());
  console.table(upperNames);
}

// forEach() example
function logStudents() {
  students.forEach(s => {
    console.log(`${s.name} from ${s.country}`);
  });
}


/* ===============================
   PART 15 — Object + for...in Demo
   =============================== */

const demoObj = { a: 1, b: 2, c: 3 };

for (const key in demoObj) {
  console.log(key, demoObj[key]);
}


/* ===============================
   PART 16 — String Methods Demo
   =============================== */

const demoEmail = '  student@example.com  ';
const cleanedEmail = demoEmail.trim();
console.log('Valid email?', cleanedEmail.includes('@'));

let message = 'JavaScript is difficult';
message = message.replace('difficult', 'powerful');
console.log(message);
})