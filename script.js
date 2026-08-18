// Initial student data
let students = [
    {
        id: 1,
        name: "Rahul",
        status: "Absent"
    },
    {
        id: 2,
        name: "Priya",
        status: "Present"
    },
    {
        id: 3,
        name: "Arjun",
        status: "Absent"
    }
];

// DOM elements
const studentTable = document.getElementById("studentTable");
const studentName = document.getElementById("studentName");
const addStudentBtn = document.getElementById("addStudentBtn");
const searchStudent = document.getElementById("searchStudent");

const totalStudents = document.getElementById("totalStudents");
const presentCount = document.getElementById("presentCount");
const absentCount = document.getElementById("absentCount");
const attendancePercentage =
    document.getElementById("attendancePercentage");

const resetBtn = document.getElementById("resetBtn");
const dateElement = document.getElementById("date");

// Display current date
const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Display students
function displayStudents(list = students) {
    studentTable.innerHTML = "";

    if (list.length === 0) {
        studentTable.innerHTML = `
            <tr>
                <td colspan="4">No students found</td>
            </tr>
        `;
        updateDashboard();
        return;
    }

    list.forEach((student, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>

            <td>${student.name}</td>

            <td class="status ${
                student.status === "Present"
                    ? "present"
                    : "absent"
            }">
                ${student.status}
            </td>

            <td>
                <button
                    class="present-btn"
                    onclick="markAttendance(${student.id}, 'Present')">
                    Present
                </button>

                <button
                    class="absent-btn"
                    onclick="markAttendance(${student.id}, 'Absent')">
                    Absent
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Delete
                </button>
            </td>
        `;

        studentTable.appendChild(row);
    });

    updateDashboard();
}

// Update dashboard statistics
function updateDashboard() {
    const total = students.length;

    const present = students.filter(
        student => student.status === "Present"
    ).length;

    const absent = students.filter(
        student => student.status === "Absent"
    ).length;

    const percentage =
        total === 0
            ? 0
            : ((present / total) * 100).toFixed(1);

    totalStudents.textContent = total;
    presentCount.textContent = present;
    absentCount.textContent = absent;
    attendancePercentage.textContent = `${percentage}%`;
}

// Add new student
function addStudent() {
    const name = studentName.value.trim();

    if (name === "") {
        alert("Please enter a student name.");
        return;
    }

    const alreadyExists = students.some(
        student =>
            student.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
        alert("Student already exists.");
        return;
    }

    const newStudent = {
        id: Date.now(),
        name: name,
        status: "Absent"
    };

    students.push(newStudent);

    studentName.value = "";

    displayStudents();
}

// Mark attendance
function markAttendance(id, status) {
    students = students.map(student => {
        if (student.id === id) {
            return {
                ...student,
                status: status
            };
        }

        return student;
    });

    displayStudents();
}

// Delete student
function deleteStudent(id) {
    const confirmed = confirm(
        "Are you sure you want to delete this student?"
    );

    if (!confirmed) {
        return;
    }

    students = students.filter(
        student => student.id !== id
    );

    displayStudents();
}

// Search students
function searchStudents() {
    const searchValue =
        searchStudent.value.toLowerCase().trim();

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue)
    );

    displayStudents(filteredStudents);
}

// Reset all attendance
function resetAttendance() {
    const confirmed = confirm(
        "Reset attendance for all students?"
    );

    if (!confirmed) {
        return;
    }

    students = students.map(student => ({
        ...student,
        status: "Absent"
    }));

    displayStudents();
}

// Event listeners
addStudentBtn.addEventListener("click", addStudent);

studentName.addEventListener("keypress", event => {
    if (event.key === "Enter") {
        addStudent();
    }
});

searchStudent.addEventListener("input", searchStudents);

resetBtn.addEventListener("click", resetAttendance);

// Initial display
displayStudents();
