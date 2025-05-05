import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Registering Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Updated data with more personalized student details
const data = [
  {
    name: "Alice Smith",
    subject: "Math",
    score: 87,
    grade: "B+",
    date: "2025-04-30",
    status: "Passed",
    attendance: 90,
    feedback: "Good improvement over the term.",
    performance: "Satisfactory",
    detailedReport: {
      examsTaken: 4,
      homeworkScore: 85,
      quizScore: 90,
      teacherComments: "Keep up the great work!",
      improvementAreas: "Work on time management for exams.",
    }
  },
  {
    name: "Bob Lee",
    subject: "English",
    score: 73,
    grade: "C",
    date: "2025-04-29",
    status: "Passed",
    attendance: 85,
    feedback: "Needs improvement in writing skills.",
    performance: "Average",
    detailedReport: {
      examsTaken: 3,
      homeworkScore: 70,
      quizScore: 75,
      teacherComments: "Improvement seen in recent assignments.",
      improvementAreas: "Focus on grammar and vocabulary building.",
    }
  },
  {
    name: "Cathy Brown",
    subject: "Physics",
    score: 48,
    grade: "F",
    date: "2025-04-28",
    status: "Failed",
    attendance: 75,
    feedback: "Requires more focus on the subject.",
    performance: "Poor",
    detailedReport: {
      examsTaken: 2,
      homeworkScore: 50,
      quizScore: 45,
      teacherComments: "Significant improvement needed.",
      improvementAreas: "Study the basics and attend all classes.",
    }
  },
  {
    name: "David White",
    subject: "Chemistry",
    score: 91,
    grade: "A-",
    date: "2025-04-27",
    status: "Passed",
    attendance: 95,
    feedback: "Excellent understanding of the material.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: 5,
      homeworkScore: 93,
      quizScore: 90,
      teacherComments: "Outstanding work, keep it up!",
      improvementAreas: "None at the moment, continue the hard work.",
    }
  },
  {
    name: "Eva Green",
    subject: "Biology",
    score: 67,
    grade: "D+",
    date: "2025-04-26",
    status: "Passed",
    attendance: 80,
    feedback: "Average performance.",
    performance: "Satisfactory",
    detailedReport: {
      examsTaken: 4,
      homeworkScore: 60,
      quizScore: 75,
      teacherComments: "Could do better with more effort.",
      improvementAreas: "Focus on understanding key concepts in biology.",
    }
  },
  {
    name: "George King",
    subject: "History",
    score: 80,
    grade: "B",
    date: "2025-04-25",
    status: "Passed",
    attendance: 92,
    feedback: "Good grasp on historical events.",
    performance: "Good",
    detailedReport: {
      examsTaken: 4,
      homeworkScore: 78,
      quizScore: 85,
      teacherComments: "Solid understanding of the subject.",
      improvementAreas: "Could focus more on essay writing.",
    }
  },
  {
    name: "Hannah Turner",
    subject: "Geography",
    score: 65,
    grade: "C-",
    date: "2025-04-24",
    status: "Passed",
    attendance: 88,
    feedback: "Struggling with map interpretation.",
    performance: "Average",
    detailedReport: {
      examsTaken: 3,
      homeworkScore: 62,
      quizScore: 70,
      teacherComments: "More practice with maps and location-based questions needed.",
      improvementAreas: "Spend extra time on geographical terms and maps.",
    }
  },
  {
    name: "Eva Gonzalez",
    subject: "Chemistry",
    score: "86",
    grade: "A-",
    date: "2025-05-05",
    status: "Passed",
    attendance: "74",
    feedback: "Needs more practice.",
    performance: "Poor",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "86",
      quizScore: "94",
      teacherComments: "More practice needed.",
      improvementAreas: "Work on time management.",
    },
  },
  {
    name: "David Rose",
    subject: "English",
    score: "80",
    grade: "B+",
    date: "2025-05-04",
    status: "Passed",
    attendance: "72",
    feedback: "Needs improvement in writing skills.",
    performance: "Average",
    detailedReport: {
      examsTaken: "5",
      homeworkScore: "99",
      quizScore: "66",
      teacherComments: "More practice needed.",
      improvementAreas: "Improve essay writing.",
    },
  },
  {
    name: "George Johnson",
    subject: "Math",
    score: "67",
    grade: "C",
    date: "2025-05-03",
    status: "Passed",
    attendance: "81",
    feedback: "Needs more practice.",
    performance: "Satisfactory",
    detailedReport: {
      examsTaken: "3",
      homeworkScore: "77",
      quizScore: "49",
      teacherComments: "Significant improvement needed.",
      improvementAreas: "Improve essay writing.",
    },
  },
  {
    name: "George Lee",
    subject: "Physics",
    score: "67",
    grade: "C",
    date: "2025-05-02",
    status: "Passed",
    attendance: "96",
    feedback: "Struggling with key concepts.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "96",
      quizScore: "61",
      teacherComments: "Keep up the great work!",
      improvementAreas: "Study the basics and attend classes.",
    },
  },
  {
    name: "Rachel Lee",
    subject: "English",
    score: "70",
    grade: "C+",
    date: "2025-05-01",
    status: "Passed",
    attendance: "86",
    feedback: "Shows great interest.",
    performance: "Satisfactory",
    detailedReport: {
      examsTaken: "3",
      homeworkScore: "95",
      quizScore: "90",
      teacherComments: "More practice needed.",
      improvementAreas: "Practice map interpretation.",
    },
  },
  {
    name: "Hannah Turner",
    subject: "Chemistry",
    score: "89",
    grade: "A-",
    date: "2025-04-30",
    status: "Passed",
    attendance: "74",
    feedback: "Average performance.",
    performance: "Average",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "67",
      quizScore: "53",
      teacherComments: "Keep up the great work!",
      improvementAreas: "Work on time management.",
    },
  },
  {
    name: "Noah Rose",
    subject: "Physics",
    score: "61",
    grade: "C-",
    date: "2025-04-29",
    status: "Passed",
    attendance: "95",
    feedback: "Good improvement over the term.",
    performance: "Poor",
    detailedReport: {
      examsTaken: "3",
      homeworkScore: "73",
      quizScore: "98",
      teacherComments: "Could do better with more effort.",
      improvementAreas: "Focus on grammar and vocabulary.",
    },
  },
  {
    name: "Rachel Lee",
    subject: "Physics",
    score: "88",
    grade: "A-",
    date: "2025-04-28",
    status: "Passed",
    attendance: "97",
    feedback: "Good improvement over the term.",
    performance: "Average",
    detailedReport: {
      examsTaken: "3",
      homeworkScore: "96",
      quizScore: "46",
      teacherComments: "Outstanding work, keep it up!",
      improvementAreas: "Improve essay writing.",
    },
  },
  {
    name: "Julia Davis",
    subject: "Biology",
    score: "37",
    grade: "F",
    date: "2025-04-27",
    status: "Failed",
    attendance: "90",
    feedback: "Needs more practice.",
    performance: "Good",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "84",
      quizScore: "86",
      teacherComments: "Solid understanding of the subject.",
      improvementAreas: "Study the basics and attend classes.",
    },
  },
  {
    name: "Rachel White",
    subject: "Physics",
    score: "84",
    grade: "B+",
    date: "2025-04-26",
    status: "Passed",
    attendance: "94",
    feedback: "Requires more focus on the subject.",
    performance: "Average",
    detailedReport: {
      examsTaken: "5",
      homeworkScore: "86",
      quizScore: "70",
      teacherComments: "Outstanding work, keep it up!",
      improvementAreas: "Focus on grammar and vocabulary.",
    },
  },
  {
    name: "Olivia King",
    subject: "Math",
    score: "60",
    grade: "C-",
    date: "2025-04-25",
    status: "Passed",
    attendance: "71",
    feedback: "Needs more practice.",
    performance: "Average",
    detailedReport: {
      examsTaken: "3",
      homeworkScore: "56",
      quizScore: "77",
      teacherComments: "Keep up the great work!",
      improvementAreas: "Practice map interpretation.",
    },
  },
  {
    name: "Ursula Gonzalez",
    subject: "English",
    score: "83",
    grade: "B+",
    date: "2025-04-24",
    status: "Passed",
    attendance: "100",
    feedback: "Needs more practice.",
    performance: "Average",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "87",
      quizScore: "75",
      teacherComments: "More practice needed.",
      improvementAreas: "Study the basics and attend classes.",
    },
  },
  {
    name: "George Lee",
    subject: "Math",
    score: "73",
    grade: "C+",
    date: "2025-04-23",
    status: "Passed",
    attendance: "73",
    feedback: "Requires more focus on the subject.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: "4",
      homeworkScore: "53",
      quizScore: "51",
      teacherComments: "More practice needed.",
      improvementAreas: "Study the basics and attend classes.",
    },
  },
  {
    name: "Mia Lopez",
    subject: "Geography",
    score: "80",
    grade: "B+",
    date: "2025-04-22",
    status: "Passed",
    attendance: "70",
    feedback: "Average performance.",
    performance: "Average",
    detailedReport: {
      examsTaken: "4",
      homeworkScore: "78",
      quizScore: "57",
      teacherComments: "Keep up the great work!",
      improvementAreas: "Work on time management.",
    },
  },
  {
    name: "Hannah Brown",
    subject: "History",
    score: "17",
    grade: "F",
    date: "2025-04-21",
    status: "Failed",
    attendance: "86",
    feedback: "Struggling with key concepts.",
    performance: "Satisfactory",
    detailedReport: {
      examsTaken: "4",
      homeworkScore: "65",
      quizScore: "71",
      teacherComments: "Keep up the great work!",
      improvementAreas: "Work on time management.",
    },
  },
  {
    name: "Quincy Williams",
    subject: "Biology",
    score: "91",
    grade: "A",
    date: "2025-04-20",
    status: "Passed",
    attendance: "86",
    feedback: "Shows great interest.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: "2",
      homeworkScore: "71",
      quizScore: "88",
      teacherComments: "More practice needed.",
      improvementAreas: "Practice map interpretation.",
    },
  },
  {
    name: "Julia Lee",
    subject: "Physics",
    score: "60",
    grade: "C-",
    date: "2025-04-19",
    status: "Passed",
    attendance: "90",
    feedback: "Excellent understanding of the material.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: "5",
      homeworkScore: "72",
      quizScore: "89",
      teacherComments: "Solid understanding of the subject.",
      improvementAreas: "Practice map interpretation.",
    },
  },
  {
    name: "Sam Hart",
    subject: "Math",
    score: "74",
    grade: "C+",
    date: "2025-04-18",
    status: "Passed",
    attendance: "82",
    feedback: "Needs more practice.",
    performance: "Excellent",
    detailedReport: {
      examsTaken: "4",
      homeworkScore: "54",
      quizScore: "71",
      teacherComments: "Outstanding work, keep it up!",
      improvementAreas: "Focus on grammar and vocabulary.",
    },
  },
  {
    name: "Ursula Lopez",
    subject: "Math",
    score: "8",
    grade: "F",
    date: "2025-04-17",
    status: "Failed",
    attendance: "80",
    feedback: "Requires more focus on the subject.",
    performance: "Poor",
    detailedReport: {
      examsTaken: "5",
      homeworkScore: "77",
      quizScore: "48",
      teacherComments: "Significant improvement needed.",
      improvementAreas: "Improve essay writing.",
    },
  },
  {
    name: "Kevin Turner",
    subject: "Physics",
    score: "53",
    grade: "D+",
    date: "2025-04-16",
    status: "Passed",
    attendance: "99",
    feedback: "Very articulate.",
    performance: "Good",
    detailedReport: {
      examsTaken: "5",
      homeworkScore: "96",
      quizScore: "63",
      teacherComments: "Solid understanding of the subject.",
      improvementAreas: "Study the basics and attend classes.",
    },
  },
];


const columns = [
  { label: "Name", accessor: "name" },
  { label: "Subject", accessor: "subject" },
  { label: "Score", accessor: "score" },
  { label: "Grade", accessor: "grade" },
  { label: "Date", accessor: "date" },
  { label: "Status", accessor: "status" },
];

const StudentTable = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(null); // State to store selected student
  const rowsPerPage = 5;

  const filteredData = useMemo(
    () =>
      data.filter((row) => {
        return columns.some(
          (column) =>
            row[column.accessor]
              .toString()
              .toLowerCase()
              .includes(globalFilter.toLowerCase())
        );
      }),
    [globalFilter]
  );

  const sortedData = useMemo(() => {
    let sortableData = [...filteredData];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [filteredData, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const pageCount = Math.ceil(sortedData.length / rowsPerPage);
  const currentPageData = sortedData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1));
  };

  const previousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  // Chart Data Preparation (Score Distribution)
  const scores = data.map((item) => item.score);
  const chartData = {
    labels: filteredData.map((item) => item.name),
    datasets: [
      {
        label: "Test Scores",
        data: scores,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const handleRowClick = (student) => {
    setSelectedStudent(student); // Set the selected student for report display
  };

  const handleCloseReport = () => {
    setSelectedStudent(null); // Close the detailed view
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-5xl p-8 shadow-lg bg-white">
        <CardContent>
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Student Test Results</h1>
          <div className="search-container">
            <Input
              type="text"
              placeholder="Search by name..."
              value={globalFilter || ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="mb-6 text-xl p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 search-input"
            />
          </div>

          {/* Chart Section */}
          <div className="mb-10 chart-container">
            <Line data={chartData} options={{ responsive: true }} />
          </div>

          {/* Table Section */}
          <table className="w-full border text-xl">
            <thead className="bg-gray-200">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.accessor}
                    className="border px-12 py-8 text-left cursor-pointer text-2xl font-semibold"
                    onClick={() => requestSort(column.accessor)}
                  >
                    {column.label}
                    {sortConfig.key === column.accessor && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="space-y-4">
              {currentPageData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white border cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(row)}
                >
                  {columns.map((column) => (
                    <td key={column.accessor} className="px-12 py-8 text-center text-xl font-medium">
                      {row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>


          {/* Pagination Section */}
          <div className="mt-6 flex justify-between items-center pagination">
            <button
              onClick={previousPage}
              disabled={currentPage === 0}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg disabled:opacity-50 text-xl"
            >
              Previous
            </button>
            <span className="text-lg text-gray-700">
              Page {currentPage + 1} of {pageCount}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === pageCount - 1}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg disabled:opacity-50 text-xl"
            >
              Next
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Report Modal */}
      {selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
              <Card className="w-96 p-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                  {selectedStudent.name}'s Report
                </h2>

                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Subject:</strong> {selectedStudent.subject}
                </p>
                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Score:</strong> {selectedStudent.score}
                </p>
                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Grade:</strong> {selectedStudent.grade}
                </p>
                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Status:</strong> {selectedStudent.status}
                </p>
                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Performance:</strong> {selectedStudent.performance}
                </p>
                <p className="mb-2">
                  <strong className="text-lg text-gray-700">Attendance:</strong> {selectedStudent.attendance}%
                </p>
                <p className="mb-4">
                  <strong className="text-lg text-gray-700">Feedback:</strong> {selectedStudent.feedback}
                </p>
                <div className="pagination">
                  <button
                    onClick={handleCloseReport}
                    className="mt-4 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;