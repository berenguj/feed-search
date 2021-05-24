import React from "react";

export const MONTHS = [
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

export const YEARS = [
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
    id: 11,
    value: "2020",
  },
  {
    id: 12,
    value: "2021",
  },
];

/*function for formatting the month and date selection to match the date value from Instagram's API*/
export const getMonthYearCombo = (
  yearSelected,
  monthSelected,
  setMonthYearCombo
) => {
  let monthYearComboTemp = yearSelected.value + "-";
  switch (monthSelected.value) {
    case "Jan":
      monthYearComboTemp += "01";
      break;
    case "Feb":
      monthYearComboTemp += "02";
      break;
    case "Mar":
      monthYearComboTemp += "03";
      break;
    case "Apr":
      monthYearComboTemp += "04";
      break;
    case "May":
      monthYearComboTemp += "05";
      break;
    case "Jun":
      monthYearComboTemp += "06";
      break;
    case "Jul":
      monthYearComboTemp += "07";
      break;
    case "Aug":
      monthYearComboTemp += "08";
      break;
    case "Sep":
      monthYearComboTemp += "09";
      break;
    case "Oct":
      monthYearComboTemp += "10";
      break;
    case "Nov":
      monthYearComboTemp += "11";
      break;
    case "Dec":
      monthYearComboTemp += "12";
      break;
  }
  setMonthYearCombo(monthYearComboTemp);
};

const DateSearch = ({}) => {
  return <> </>;
};

export default DateSearch;
