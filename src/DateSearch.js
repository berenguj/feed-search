import React, { useState } from "react";
import DateDropdown from "./DateDropdown";
import "./App.css";

const DateSearch = ({ showDateSearch }) => {
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

  const days = [
    {
      id: 1,
      value: "1",
    },
    {
      id: 2,
      value: "2",
    },
    {
      id: 3,
      value: "3",
    },
    {
      id: 4,
      value: "4",
    },
    {
      id: 5,
      value: "5",
    },
    {
      id: 6,
      value: "6",
    },
    {
      id: 7,
      value: "7",
    },
    {
      id: 8,
      value: "8",
    },
    {
      id: 9,
      value: "9",
    },
    {
      id: 10,
      value: "10",
    },
    {
      id: 11,
      value: "11",
    },
    {
      id: 12,
      value: "12",
    },
    {
      id: 13,
      value: "13",
    },
    {
      id: 14,
      value: "14",
    },
    {
      id: 15,
      value: "15",
    },
    {
      id: 16,
      value: "16",
    },
    {
      id: 17,
      value: "17",
    },
    {
      id: 18,
      value: "18",
    },
    {
      id: 19,
      value: "19",
    },
    {
      id: 20,
      value: "20",
    },
    {
      id: 21,
      value: "21",
    },
    {
      id: 22,
      value: "22",
    },
    {
      id: 23,
      value: "23",
    },
    {
      id: 24,
      value: "24",
    },
    {
      id: 25,
      value: "25",
    },
    {
      id: 26,
      value: "26",
    },
    {
      id: 27,
      value: "27",
    },
    {
      id: 28,
      value: "28",
    },
    {
      id: 29,
      value: "29",
    },
    {
      id: 30,
      value: "30",
    },
    {
      id: 31,
      value: "31",
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

  return (
    <>
      {showDateSearch && (
        <div className="center">
          <DateDropdown title="Month" items={months} />
          <DateDropdown title="Day" items={days} />
          <DateDropdown title="Year" items={years} />
        </div>
      )}
    </>
  );
};

export default DateSearch;
