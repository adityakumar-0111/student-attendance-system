import { useState, useEffect } from "react";
import jsPDF from "jspdf";

function History() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");

  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];

    setStudents(savedStudents);

    if (savedStudents.length > 0) {
      setSelectedStudent(savedStudents[0].id);
    }
  }, []);

  const student = students.find(
    (s) => s.id === Number(selectedStudent)
  );

  const history = student?.history
    ? [...student.history].reverse()
    : [];

  const presentCount = history.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = history.filter(
    (item) => item.status === "Absent"
  ).length;

  const lateCount = history.filter(
    (item) => item.status === "Late"
  ).length;

  const percentage =
    history.length > 0
      ? (
          (presentCount / history.length) *
          100
        ).toFixed(1)
      : 0;

  const downloadPDF = () => {
    if (!student || history.length === 0) {
      alert("No attendance data available.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(
      "Student Attendance Report",
      20,
      20
    );

    doc.setFontSize(12);

    doc.text(
      `Student Name: ${student.name}`,
      20,
      35
    );

    doc.text(
      `Present: ${presentCount}`,
      20,
      45
    );

    doc.text(
      `Absent: ${absentCount}`,
      20,
      55
    );

    doc.text(
      `Late: ${lateCount}`,
      20,
      65
    );

    doc.text(
      `Attendance Percentage: ${percentage}%`,
      20,
      75
    );

    let y = 95;

    doc.setFontSize(14);
    doc.text("Attendance History", 20, y);

    y += 10;

    doc.setFontSize(12);

    history.forEach((record) => {
      doc.text(
        `${record.date}  -  ${record.status}`,
        20,
        y
      );

      y += 10;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save(
      `${student.name}-attendance-report.pdf`
    );
  };

  return (
    <div>
      <h1>Attendance History</h1>

      {students.length === 0 ? (
        <p>No students available.</p>
      ) : (
        <>
          <select
            value={selectedStudent}
            onChange={(e) =>
              setSelectedStudent(e.target.value)
            }
          >
            {students.map((student) => (
              <option
                key={student.id}
                value={student.id}
              >
                {student.name}
              </option>
            ))}
          </select>

          <br />
          <br />

          {student && (
            <>
              <div className="student-card">
                <h2>{student.name}</h2>

                <p>
                  <strong>Total Records:</strong>{" "}
                  {history.length}
                </p>

                <p>
                  <strong>Present:</strong>{" "}
                  {presentCount}
                </p>

                <p>
                  <strong>Absent:</strong>{" "}
                  {absentCount}
                </p>

                <p>
                  <strong>Late:</strong>{" "}
                  {lateCount}
                </p>

                <p>
                  <strong>
                    Attendance Percentage:
                  </strong>{" "}
                  {percentage}%
                </p>

                <br />

                <button
                  className="download-btn"
                  onClick={downloadPDF}
                >
                  📄 Download PDF Report
                </button>
              </div>

              <br />

              {history.length === 0 ? (
                <p>
                  No attendance history found.
                </p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {history.map(
                      (item, index) => (
                        <tr key={index}>
                          <td>{item.date}</td>

                          <td
                            style={{
                              color:
                                item.status ===
                                "Present"
                                  ? "green"
                                  : item.status ===
                                    "Absent"
                                  ? "red"
                                  : "#ca8a04",
                              fontWeight:
                                "bold",
                            }}
                          >
                            {item.status}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default History;