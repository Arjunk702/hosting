// components/StudentPopup.js
import React from "react";

function StudentPopup({ newStudent, setNewStudent, addStudent, closeStudentPopup }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Add Student</h2>
                <label>
                    Name:
                    <input
                        type="text"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        placeholder="Enter student name"
                    />
                </label>
                <label>
                    Class:
                    <input
                        type="text"
                        value={newStudent.class}
                        onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                        placeholder="Enter student class"
                    />
                </label>
                <label>
                    ID:
                    <input
                        type="text"
                        value={newStudent.ID}
                        onChange={(e) => setNewStudent({ ...newStudent, ID: e.target.value })}
                        placeholder="Enter student ID"
                    />
                </label>
                <div className="popup-actions">
                    <button onClick={addStudent} disabled={!newStudent.name.trim() || !newStudent.class.trim() || !newStudent.ID.trim()}>Add</button>
                    <button onClick={closeStudentPopup}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default StudentPopup;
