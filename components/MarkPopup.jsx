// components/MarkPopup.jsx
import React from "react";

function MarkPopup({ newMark, setNewMark, addMark, closeMarkPopup }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <h2>Add Marks</h2>
                <label>
                    Exam Name:
                    <input
                        type="text"
                        value={newMark.ExamName}
                        onChange={(e) => setNewMark({ ...newMark, ExamName: e.target.value })}
                        placeholder="Enter exam name"
                    />
                </label>
                <label>
                    Subject 1:
                    <input
                        type="text"
                        value={newMark.sub1}
                        onChange={(e) => setNewMark({ ...newMark, sub1: e.target.value })}
                        placeholder="Enter marks for Subject 1"
                    />
                </label>
                <label>
                    Subject 2:
                    <input
                        type="text"
                        value={newMark.sub2}
                        onChange={(e) => setNewMark({ ...newMark, sub2: e.target.value })}
                        placeholder="Enter marks for Subject 2"
                    />
                </label>
                <label>
                    Subject 3:
                    <input
                        type="text"
                        value={newMark.sub3}
                        onChange={(e) => setNewMark({ ...newMark, sub3: e.target.value })}
                        placeholder="Enter marks for Subject 3"
                    />
                </label>
                <div className="popup-actions">
                    <button onClick={addMark} disabled={!newMark.ExamName.trim() || !newMark.sub1.trim() || !newMark.sub2.trim() || !newMark.sub3.trim()}>Add</button>
                    <button onClick={closeMarkPopup}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default MarkPopup;
