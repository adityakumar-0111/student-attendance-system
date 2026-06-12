import { useState, useEffect } from "react";

function Students() {
  const [students, setStudents] = useState(() => {
    const savedStudents = localStorage.getItem("students");
    return savedStudents ? JSON.parse(savedStudents) : [];
  });

  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (!name.trim()) {
      alert("Please enter a student name");
      return;
    }

    setStudents([
      ...students,
      {
        id: Date.now(),
        name,
        status: "Not Marked",
        history: [],
      },
    ]);

    setName("");
  };

  const editStudent = (id) => {
    const newName = prompt("Enter new student name:");

    if (!newName || !newName.trim()) return;

    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, name: newName.trim() }
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    setStudents(
      students.filter(
        (student) => student.id !== id
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Students Management</h1>

      <h3>
        Total Students: {students.length}
      </h3>

      <br />

      <input
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />
      
      <button
         className="add-btn"
         onClick={addStudent}
>
         ➕ Add Student
      </button>

      <br />
      <br />

      <input
        type="text"
        placeholder="🔍 Search Student"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {filteredStudents.length === 0 ? (
        <p>No students found.</p>
      ) : (
        filteredStudents.map((student) => (
          <div
            key={student.id}
            className="student-card"
          >
            <h3>{student.name}</h3>

            <p>
              Current Status:{" "}
              <strong>
                {student.status}
              </strong>
            </p>

            <button
              className="edit-btn"
              onClick={() =>
                editStudent(student.id)
              }
            >
              ✏️ Edit
            </button>

            <button
              className="delete-btn"
              onClick={() =>
                deleteStudent(student.id)
              }
            >
              🗑️ Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Students;