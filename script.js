
// Get student records from Local Storage
let students = JSON.parse(
    localStorage.getItem("students")
) || [];

// Display students
function displayStudents(data = students) {

    let list = document.getElementById("studentList");

    list.innerHTML = "";

    data.forEach((student) => {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.marks}</td>
            <td>
                <button class="edit-btn"
                    onclick="editStudent('${student.roll}')">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteStudent('${student.roll}')">
                    Delete
                </button>
            </td>
        `;

        list.appendChild(row);
    });
}

// Add student
function addStudent() {

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let course = document.getElementById("course").value.trim();
    let marks = document.getElementById("marks").value.trim();

    if (!name || !roll || !course || !marks) {
        alert("Please fill all fields");
        return;
    }

    if (Number(marks) < 0 || Number(marks) > 100) {
        alert("Marks must be between 0 and 100");
        return;
    }

    if (students.some(s => s.roll === roll)) {
        alert("Roll number already exists");
        return;
    }

    let student = {
        name: name,
        roll: roll,
        course: course,
        marks: marks
    };

    students.push(student);

    saveData();
    displayStudents();
    clearForm();

    alert("Student Added Successfully");
}

// Save records
function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}

// Clear input fields
function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
    document.getElementById("marks").value = "";
}

// Delete student
function deleteStudent(roll) {

    if (confirm("Are you sure you want to delete?")) {

        students = students.filter(
            student => student.roll !== roll
        );

        saveData();
        displayStudents();

        alert("Student Deleted Successfully");
    }
}

// Edit student
function editStudent(roll) {

    let student = students.find(
        s => s.roll === roll
    );

    if (student) {

        let name = prompt("Enter new name", student.name);
        if (name === null) return;

        let course = prompt("Enter new course", student.course);
        if (course === null) return;

        let marks = prompt("Enter new marks", student.marks);
        if (marks === null) return;

        name = name.trim();
        course = course.trim();
        marks = marks.trim();

        if (!name || !course || !marks ||
            !Number.isFinite(Number(marks)) ||
            Number(marks) < 0 || Number(marks) > 100) {

            alert("Please enter valid details");
            return;
        }

        student.name = name;
        student.course = course;
        student.marks = marks;

        saveData();
        displayStudents();

        alert("Student Updated Successfully");
    }
}

// Search student
function searchStudent() {

    let value = document.getElementById("search")
        .value.toLowerCase();

    let result = students.filter(student =>
        student.name.toLowerCase().includes(value)
    );

    displayStudents(result);
}

// Display saved records when page opens
displayStudents();
