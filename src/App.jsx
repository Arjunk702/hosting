import React, { useState, useEffect } from "react";
import StudentPopup from "../components/StudentPopup.JSX";
import MarkPopup from "../components/MarkPopup.jsx";
import './App.css';
import TextFlagCursorExample from "./textFlagCursorExample.jsx";

function App() {
    const [students, setStudents] = useState([]);
    const [studentPopup, setStudentPopup] = useState(false);
    const [markPopup, setMarkPopup] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", class: "", ID: "", marks: [] });
    const [newMark, setNewMark] = useState({ ExamName: "", sub1: "", sub2: "", sub3: "" });
    const [selectedStudentId, setSelectedStudentId] = useState(null); // Track selected student

    
    useEffect(() => {
        const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
        setStudents(storedStudents);
    }, []);

    
    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    // Popup handlers
    const toggleStudentPopup = () => setStudentPopup(!studentPopup);
    const toggleMarkPopup = (studentId = null) => {
        setNewMark({ ExamName: "", sub1: "", sub2: "", sub3: "" });
        setMarkPopup(!markPopup);
    };

    // Add new student
    const addStudent = () => {
        setStudents([...students, { id: students.length + 1, ...newStudent, marks: [] }]);
        toggleStudentPopup();
        setNewStudent({ name: "", class: "", ID: "", marks: [] });
    };

    // Add marks to a specific student
    const addMark = () => {
        setStudents((prevStudents) =>
            prevStudents.map((student) =>
                student.id === selectedStudentId
                    ? { ...student, marks: [...student.marks, newMark] }
                    : student
            )
        );
        toggleMarkPopup();
    };

    // Select a student to display their marks
    const handleStudentClick = (studentId) => {
        setSelectedStudentId(studentId === selectedStudentId ? null : studentId); // Toggle display
    };

    const calculateAverage = (marks) => {
        const subjects = marks.flatMap((mark) => [mark.sub1, mark.sub2, mark.sub3].map(Number)); // Convert to numbers
        const validMarks = subjects.filter((m) => !isNaN(m)); // Filter valid marks
        const average = validMarks.reduce((sum, val) => sum + val, 0) / validMarks.length;
        return validMarks.length > 0 ? average : null; // Return average or null if no valid marks
    };

    const { passedCount, failedCount } = students.reduce(
        (acc, student) => {
            const averages = student.marks.map((mark) => calculateAverage([mark])).filter((avg) => avg !== null);
            if (averages.length > 0) {
                const overallAverage = averages.reduce((sum, avg) => sum + avg, 0) / averages.length;
                overallAverage >= 50 ? acc.passedCount++ : acc.failedCount++;
            }
            return acc;
        },
        { passedCount: 0, failedCount: 0 }
    );

    return (<div className="App">
        <div>
      <TextFlagCursorExample />
      <h1>Custom Cursor with Cursify</h1>
    </div>
        <h1>Student Management System</h1>
        <button onClick={toggleStudentPopup}>Add Student</button>
        <p>Total Students: {students.length}</p>
        <p>passed students:{passedCount}</p>
        <p>failedstudents:{failedCount}</p>
        {/* Students Table */}
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td onClick={() => handleStudentClick(student.id)} style={{ cursor: "pointer", color: "black" }}>
                            {student.name}
                        </td>
                        <td>{student.class}</td>
                        <td>{student.ID}</td>
                        <td>
                            <button onClick={() => toggleMarkPopup(student.id)}>Add Marks</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    
        {/* Marks Table */}
        {selectedStudentId && (
            <div>
                <h2>Marks Details</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Exam Name</th>
                            <th>Sub1</th>
                            <th>Sub2</th>
                            <th>Sub3</th>
                            <th>Total Marks</th>
                            <th>Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students
                            .find((student) => student.id === selectedStudentId)
                            .marks.map((mark, index) => {
                                const total = [mark.sub1, mark.sub2, mark.sub3]
                                    .map(Number) // Convert to numbers
                                    .filter((val) => !isNaN(val)) // Filter valid numbers
                                    .reduce((sum, val) => sum + val, 0); // Sum up
    
                                const average = calculateAverage([mark]);
                                return (
                                    <tr key={index}>
                                        <td>{mark.ExamName}</td>
                                        <td>{mark.sub1}</td>
                                        <td>{mark.sub2}</td>
                                        <td>{mark.sub3}</td>
                                        <td>{total}</td>
                                        <td>{average !== null ? average.toFixed(2) : "-"}</td>
                                    </tr>
                                );
                            })}
    
                        {/* Calculate and Display Subject Totals */}
                        {(() => {
                            const selectedStudent = students.find((student) => student.id === selectedStudentId);
                            const totalSub1 = selectedStudent.marks
                                .map((mark) => Number(mark.sub1) || 0)
                                .reduce((sum, val) => sum + val, 0);
                            const totalSub2 = selectedStudent.marks
                                .map((mark) => Number(mark.sub2) || 0)
                                .reduce((sum, val) => sum + val, 0);
                            const totalSub3 = selectedStudent.marks
                                .map((mark) => Number(mark.sub3) || 0)
                                .reduce((sum, val) => sum + val, 0);
    
                            return (
                                <tr style={{ fontWeight: "bold" }}>
                                    <td colSpan="1">Total:</td>
                                    <td>{totalSub1}</td>
                                    <td>{totalSub2}</td>
                                    <td>{totalSub3}</td>
                                    <td>{totalSub1 + totalSub2 + totalSub3}</td>
                                    <td>-</td>
                                </tr>
                            );
                        })()}
                    </tbody>
                </table>
            </div>
        )}
    
        {/* Popups */}
        {studentPopup && (
            <StudentPopup
                newStudent={newStudent}
                setNewStudent={setNewStudent}
                addStudent={addStudent}
                closeStudentPopup={toggleStudentPopup}
            />
        )}
        {markPopup && (
            <MarkPopup
                newMark={newMark}
                setNewMark={setNewMark}
                addMark={addMark}
                closeMarkPopup={toggleMarkPopup}
            />
        )}
    </div>
    
      
    );
}

export default App;
