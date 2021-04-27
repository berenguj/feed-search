import React, { useState, useEffect } from "react";
import DateDropdown from "./DateDropdown";
import useDidMountEffect from './useDidMountEffect';
import "./App.css";
import Posts from "./Posts";

const DateSearch = ({ showDateSearch }) => {
  //let monthSelected = {};
  const [monthSelected, setMonthSelected] = useState({});
  //let yearSelected = {};
  const [yearSelected, setYearSelected] = useState({});
  const [posts, setPosts] = useState([]);
  let monthYearCombo = "";
  let filteredPosts = [];
  const [monthSelectedBool, setMonthSelectedBool] = useState(false);
  const [yearSelectedBool, setYearSelectedBool] = useState(false);
  const [dateSelectedBool, setDateSelectedBool] = useState(false);
  const [rerenderPrecaution, setRerenderPrecation] = useState(false);
  let postData = [];

  /*useEffect(() => {
    getUserMedia();
  }, [dateSelectedBool]);*/

  useDidMountEffect(() => { /*doesn't run on initial render*/
    //getUserMedia();
  }, [dateSelectedBool])

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
    {
      id: 11,
      value: "2021",
    }
  ];

  const getUserMedia = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=IGQVJVNGtnY3NJNW5hREY0alREVUNZAZA3JGNWxtZAHZAub3lzY1AzZAmszM1FVdWF2MlRreTJzQ3draGVabG92Mk56UXdFZAllqam5VclEzSk9oZAGxNbnRGX3l0LWxvN0NSelhJY3M5UVZA1UmVuYVJNYUpkRAZDZD&limit=100"
    );
    postData = await response.json();
    console.log("about to set date bool");
    setDateSelectedBool(true);
    console.log("getusermedia executed");
    setPosts(postData);
    setRerenderPrecation(true);
  };

  const handleMonthDropdown = (selec) => {
    //monthSelected = selec;
    setMonthSelected(selec);
    setMonthSelectedBool(true);
    console.log(monthSelected);
  };

  const handleYearDropdown = (selec) => {
    setYearSelected(selec);
    //yearSelected = selec;
    setYearSelectedBool(true);
    console.log(yearSelected);
  };

  const getMonthYearCombo = () => {
    console.log(monthSelected);
    monthYearCombo = yearSelected.value + "-";
    console.log(monthYearCombo);
    switch (monthSelected.value) {
      case "Jan":
        monthYearCombo += "01";
        break;
      case "Feb":
        monthYearCombo += "02";
        break;
      case "Mar":
        monthYearCombo += "03";
        break;
      case "Apr":
        monthYearCombo += "04";
        break;
      case "May":
        monthYearCombo += "05";
        break;
      case "Jun":
        monthYearCombo += "06";
        break;
      case "Jul":
        monthYearCombo += "07";
        break;
      case "Aug":
        monthYearCombo += "08";
        break;
      case "Sep":
        monthYearCombo += "09";
        break;
      case "Oct":
        monthYearCombo += "10";
        break;
      case "Nov":
        monthYearCombo += "11";
        break;
      case "Dec":
        monthYearCombo += "12";
        break;
    }
    console.log(monthYearCombo);
  };

  const dateSelected = () => {
    /*if(rerenderPrecaution){
      return false;
    }*/
    if (!yearSelectedBool || !monthSelectedBool) {
      console.log("return false");
      return false;
    }
    else if(dateSelectedBool == true){
      return true;
    }
    else{
      getUserMedia();
      //setDateSelectedBool(true);
      console.log("return true");
      return true;
    }
  };

  const filterByDate = () => {
    getMonthYearCombo();
    let dateSearched = monthYearCombo;
    console.log("datesearched: " + dateSearched);
    //while(postData.length == 0){ console.log("waiting for data"); }
    postData.map((post) => {
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
              handleDropdown={handleMonthDropdown}
            />
            <DateDropdown
              title="Year"
              items={years}
              handleDropdown={handleYearDropdown}
            />
          </div>
          <div className="center">
            <button className="btn">Search</button>
          </div>
          <div>
            {dateSelected() && filterByDate() && rerenderPrecaution ? (
              <Posts postData={filteredPosts} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default DateSearch;
