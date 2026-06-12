import { useEffect, useState } from "react";

function Dashboard() {
  const [students, setStudents] = useState([]);

  // SAFE LOAD FROM LOCALSTORAGE
  useEffect(() => {
    try {
      const savedStudents =
        JSON.parse(localStorage.getItem("students")) || [];
      setStudents(savedStudents);
    } catch (error) {
      console.error("LocalStorage Error:", error);
      setStudents([]);
    }
  }, []);

  const totalStudents = students.length;

  // COUNT FROM HISTORY (CORRECT LOGIC)
  let presentCount = 0;
  let absentCount = 0;

  students.forEach((student) => {
    const lastRecord =
      student.history?.[student.history.length - 1];

    if (lastRecord?.status === "Present") {
      presentCount++;
    } else if (lastRecord?.status === "Absent") {
      absentCount++;
    }
  });

  const attendancePercentage =
    totalStudents > 0
      ? ((presentCount / totalStudents) * 100).toFixed(1)
      : 0;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div className="summary">
        <div className="card">
          <h3>👨‍🎓 Total Students</h3>
          <p>{totalStudents}</p>
        </div>

        <div className="card">
          <h3>✅ Present</h3>
          <p>{presentCount}</p>
        </div>

        <div className="card">
          <h3>❌ Absent</h3>
          <p>{absentCount}</p>
        </div>

        <div className="card">
          <h3>📈 Attendance %</h3>
          <p>{attendancePercentage}%</p>
        </div>
      </div>

      <div
        style={{
          background: "white",
          marginTop: "150px",
          padding: "25px",
          borderRadius: "20px",
          boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: "#312e81",
          }}
        >
          Dashboard Overview
        </h2>

        <p
          style={{
            textAlign: "center",
            lineHeight: "1.8",
            fontSize: "18px",
            color: "#475569",
          }}
        >
          Welcome to the Student Attendance Management System Dashboard.
          Here you can manage students, mark attendance, monitor attendance
          percentage, track attendance records, and maintain student
          information efficiently.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;