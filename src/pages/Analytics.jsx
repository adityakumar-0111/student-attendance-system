import { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Analytics() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(savedStudents);
  }, []);

  let totalPresent = 0;
  let totalAbsent = 0;
  let totalLate = 0;

  students.forEach((student) => {
    (student.history || []).forEach((record) => {
      if (record.status === "Present") {
        totalPresent++;
      } else if (record.status === "Absent") {
        totalAbsent++;
      } else if (record.status === "Late") {
        totalLate++;
      }
    });
  });

  const totalRecords =
    totalPresent +
    totalAbsent +
    totalLate;

  const pieData = {
    labels: [
      "Present",
      "Absent",
      "Late",
    ],
    datasets: [
      {
        data: [
          totalPresent,
          totalAbsent,
          totalLate,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#eab308",
        ],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: [
      "Present",
      "Absent",
      "Late",
    ],
    datasets: [
      {
        label: "Attendance Records",
        data: [
          totalPresent,
          totalAbsent,
          totalLate,
        ],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#eab308",
        ],
      },
    ],
  };

  return (
    <div>
      <h1>
        📊 Attendance Analytics
      </h1>

      <div className="summary">
        <div className="card">
          <h3>
            📚 Total Records
          </h3>
          <p>{totalRecords}</p>
        </div>

        <div className="card">
          <h3>
            ✅ Present
          </h3>
          <p>{totalPresent}</p>
        </div>

        <div className="card">
          <h3>
            ❌ Absent
          </h3>
          <p>{totalAbsent}</p>
        </div>

        <div className="card">
          <h3>
            ⏰ Late
          </h3>
          <p>{totalLate}</p>
        </div>
      </div>

      <br />

      <div className="student-card">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Attendance Distribution
        </h2>

        <div
          style={{
            maxWidth: "450px",
            margin: "0 auto",
          }}
        >
          <Pie data={pieData} />
        </div>
      </div>

      <br />

      <div className="student-card">
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Attendance Comparison
        </h2>

        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>

      <br />

      <div className="student-card">
        <h2>
          📈 Analytics Overview
        </h2>

        <p>
          This section shows the complete
          attendance analysis of all students.
          The charts automatically update
          whenever attendance is marked.
        </p>

        <br />

        <p>
          Total Students:{" "}
          <strong>
            {students.length}
          </strong>
        </p>

        <p>
          Total Attendance Records:{" "}
          <strong>
            {totalRecords}
          </strong>
        </p>
      </div>
    </div>
  );
}

export default Analytics;