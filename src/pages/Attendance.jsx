import { useEffect, useState } from "react";

function Attendance() {
const [students, setStudents] = useState([]);
const [toast, setToast] = useState("");

useEffect(() => {
const today =
new Date().toISOString().split("T")[0];

const savedStudents =
  JSON.parse(localStorage.getItem("students")) || [];

const refreshedStudents = savedStudents.map(
  (student) => {
    const todayRecord = student.history?.find(
      (item) => item.date === today
    );

    return {
      ...student,
      status: todayRecord
        ? todayRecord.status
        : "Not Marked",
    };
  }
);

setStudents(refreshedStudents);onabort

}, []);

const markAttendance = (id, status) => {
const today =
new Date().toISOString().split("T")[0];


const updatedStudents = students.map(
  (student) => {
    if (student.id === id) {
      const alreadyMarkedToday =
        student.history?.some(
          (item) => item.date === today
        );

      let updatedHistory;

      if (alreadyMarkedToday) {
        updatedHistory = student.history.map(
          (item) =>
            item.date === today
              ? {
                  ...item,
                  status,
                }
              : item
        );
      } else {
        updatedHistory = [
          ...(student.history || []),
          {
            date: today,
            status,
          },
        ];
      }

      setToast(
        `✅ ${student.name} marked as ${status}`
      );

      setTimeout(() => {
        setToast("");
      }, 2500);

      return {
        ...student,
        status,
        history: updatedHistory,
      };
    }

    return student;
  }
);

setStudents(updatedStudents);

localStorage.setItem(
  "students",
  JSON.stringify(updatedStudents)
);

};

return ( <div>
{toast && ( <div className="toast">
{toast} </div>
)}

  <h1>Attendance Management</h1>

  {students.length === 0 ? (
    <p>No students found.</p>
  ) : (
    students.map((student) => (
      <div
        key={student.id}
        className={`student-card ${
          student.status === "Present"
            ? "present"
            : student.status === "Absent"
            ? "absent"
            : student.status === "Late"
            ? "late"
            : ""
        }`}
      >
        <h3>{student.name}</h3>

        <button
          className="present-btn"
          onClick={() =>
            markAttendance(
              student.id,
              "Present"
            )
          }
        >
          ✅ Present
        </button>

        <button
          className="absent-btn"
          onClick={() =>
            markAttendance(
              student.id,
              "Absent"
            )
          }
        >
          ❌ Absent
        </button>

        <button
          className="late-btn"
          onClick={() =>
            markAttendance(
              student.id,
              "Late"
            )
          }
        >
          ⏰ Late
        </button>

        <p>
          Status:
          <strong
            style={{
              marginLeft: "8px",
              color:
                student.status === "Present"
                  ? "green"
                  : student.status === "Absent"
                  ? "red"
                  : student.status === "Late"
                  ? "#ca8a04"
                  : "#475569",
            }}
          >
            {student.status}
          </strong>
        </p>
      </div>
    ))
  )}
</div>

);
}

export default Attendance;
