import React, { useState } from "react";
import "../scss/students.css";

const Students = ({ student, data, index, setData }) => {
  const [toggle, setToggle] = useState(false);
  const [tagName, setTagName] = useState("");

  // converts string array to number to get avg
  const gradesNumber = student.grades.map(n => {
    return Number(n);
  });
  //  Getting average;
  const avg = gradesNumber.reduce((a, b) => a + b, 0) / gradesNumber.length;

  //Add tag
  const addTagHandler = (id, e) => {
    e.preventDefault();
    console.log(id);
    console.log("tagName:", tagName);

    let stud = data.students.map(d => {
      if (d.id === id) {
        if (!d.tag) {
          console.log("empty");
          d.tag = [];
        }
        d.tag = [...d.tag, tagName];
        // setData((d.tag = [...d.tag, tagName]));
        console.log("students:", d);
        setTagName("");
      }
    });
    //new data with tags
    data.students = [...data.students, stud];
    console.log("new data:", data.students);
  };

  return (
    <div className="students">
      <>
        <input
          type="text"
          placeholder="Search by tag"
          // onChange={e => setSearchData(e.target.value)}

          className="searchbar"
        />
        <div className="image-container">
          <img src={student.pic} alt={student.firstName} />
        </div>
        <div className="text-container">
          <div className="header">
            <h1>
              {student.firstName} <span>{student.lastName}</span>
            </h1>
            {toggle ? (
              <button className="plus" onClick={() => setToggle(!toggle)}>
                -
              </button>
            ) : (
              <button className="plus" onClick={() => setToggle(!toggle)}>
                +
              </button>
            )}
          </div>
          <p>Email: {student.email}</p>
          <p>Company: {student.company}</p>
          <p>Skill: {student.skill}</p>
          {avg ? <p>Average: {avg}%</p> : ""}

          {toggle ? (
            <div className="grades">
              {student.grades.map((student, index) => (
                <p key={index}>
                  Test {index + 1}: <span> {student}%</span>
                </p>
              ))}
            </div>
          ) : (
            ""
          )}
          <div className="tags-container">
            <div className="tag-list">
              {student.tag
                ? student.tag.map((t, i) => (
                    <p key={i} className="tag">
                      {t}
                    </p>
                  ))
                : ""}
            </div>
            <form
              onSubmit={e => {
                addTagHandler(student.id, e);
              }}
            >
              <input
                type="text"
                placeholder="Add a tag"
                onChange={e => setTagName(e.target.value)}
                value={tagName}
              />
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default Students;
