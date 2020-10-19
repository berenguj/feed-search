import React, { useState } from "react";
import DateDropdown from "./DateDropdown";
import "./App.css";
import Posts from "./Posts";

const DateSearch = ({ showDateSearch, posts }) => {
  let dateSelected = [];
  let filteredPosts = [];

  const months = [
    {
      id: 1,
      value: "Jan",
    },
    {
      id: 2,
      value: "Feb",
    },
    {
      id: 3,
      value: "Mar",
    },
    {
      id: 4,
      value: "Apr",
    },
    {
      id: 5,
      value: "May",
    },
    {
      id: 6,
      value: "Jun",
    },
    {
      id: 7,
      value: "Jul",
    },
    {
      id: 8,
      value: "Aug",
    },
    {
      id: 9,
      value: "Sep",
    },
    {
      id: 10,
      value: "Oct",
    },
    {
      id: 11,
      value: "Nov",
    },
    {
      id: 12,
      value: "Dec",
    },
  ];

  const years = [
    {
      id: 1,
      value: "2010",
    },
    {
      id: 2,
      value: "2011",
    },
    {
      id: 3,
      value: "2012",
    },
    {
      id: 4,
      value: "2013",
    },
    {
      id: 5,
      value: "2014",
    },
    {
      id: 6,
      value: "2015",
    },
    {
      id: 7,
      value: "2016",
    },
    {
      id: 8,
      value: "2017",
    },
    {
      id: 9,
      value: "2018",
    },
    {
      id: 10,
      value: "2019",
    },
    {
      id: 10,
      value: "2020",
    },
  ];

  const handleDropdown = (selec) => {
    console.log("in handle dropdown");
    dateSelected.push(selec);
    console.log(dateSelected);
  };

  const postDataPresent = () => {
    if (posts != null) {
      return true;
    }
    console.log("hello");
    return false;
  };

  const filterByDate = () => {
    let dateSearched = "2020-07";
    posts.map((post) => {
      if (post.timestamp.substring(0, 7) === dateSearched) {
        filteredPosts.push(post);
      }
    });
    return true;
  };

  return (
    <>
      {showDateSearch && (
        <div>
          <div className="center">
            <DateDropdown
              title="Month"
              items={months}
              handleDropdown={handleDropdown}
            />
            <DateDropdown
              title="Year"
              items={years}
              handleDropdown={handleDropdown}
            />
          </div>
          <div className="center">
            <button className="btn">Search</button>
          </div>
          <div>
            {postDataPresent() && filterByDate() ? (
              <Posts postData={filteredPosts} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default DateSearch;
