import React, { useState, useEffect } from "react";
import Students from "./Students";
import axios from "axios";
import "../scss/Home.css";

const Home = () => {
  const [data, setData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [filteredSearch, setFilteredSearch] = useState([]);

  const getData = () => {
    const url = `https://api.hatchways.io/assessment/students`;
    axios.get(url).then(response => {
      setData(response.data);
      console.log(response.data);
    });
  };
  //  const insertData

  useEffect(() => {
    getData();
    if (searchData.length > 0) {
      setFilteredSearch(
        data.students.filter(
          name =>
            name.firstName.toLowerCase().includes(searchData.toLowerCase()) ||
            name.lastName.toLowerCase().includes(searchData.toLowerCase())
        )
      );
    } else if (searchData === "") {
      setFilteredSearch("");
    }
  }, [searchData]);

  return (
    <div className="Home">
      {/* <Search /> */}
      <input
        type="text"
        placeholder="Search by name"
        onChange={e => setSearchData(e.target.value)}
        value={searchData}
        className="searchbar"
      />
      <input type="text" placeholder="Search by tag" className="searchbar" />

      {filteredSearch
        ? filteredSearch.map((student, index) => (
            <Students
              student={student}
              key={index}
              data={data}
              // tagName={tagName}
              // setTagName={setTagName}
              // tag={tag}
              // setTag={setTag}
            />
          ))
        : data &&
          data.students.map((student, index) => (
            <Students
              student={student}
              key={index}
              index={index}
              data={data}
              // tagName={tagName}
              // setTagName={setTagName}
              // tag={tag}
              // setTag={setTag}
            />
          ))}

      {/* {filteredSearch
        ? filteredSearch.map((student, index) => (
            <Students
              student={student}
              key={index}
              data={data}
              tag={tag}
              setTag={setTag}
            />
          ))
        : data &&
          data.students.map((student, index) => (
            <Students
              student={student}
              key={index}
              index={index}
              tag={tag}
              setTag={setTag}
            />
          ))} */}
    </div>
  );
};

export default Home;
