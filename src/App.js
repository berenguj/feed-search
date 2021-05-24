import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./Dropdown";
import DateDropdown from "./DateDropdown";
import Posts from "./Posts";

function App() {
  const [selection, setSelection] = useState([]);
  const [showDateSearch, setDateSearch] = useState(false);
  const [showPeopleSearch, setPeopleSearch] = useState(false);
  const [showLocationSearch, setLocationSearch] = useState(false);
  const [monthSelected, setMonthSelected] = useState({});
  const [yearSelected, setYearSelected] = useState({});
  const [monthSelectedBool, setMonthSelectedBool] = useState(false);
  const [yearSelectedBool, setYearSelectedBool] = useState(false);
  const [monthYearCombo, setMonthYearCombo] = useState("");
  const [dateSelectedBool, setDateSelectedBool] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [prevPosts, setPrevPosts] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [doneFiltering, setDoneFiltering] = useState(false);
  const [initMediaIsSet, setInitMediaIsSet] = useState(false);
  let postData = [];

  /*get the user's (@jayyduhhhhh's) media when the app is first launched*/
  useEffect(() => {
    initUserMedia();
  }, []);

  /*get the first page of posts*/
  const initUserMedia = async () => {
    if (nextURL == "") {
      //initial page
      console.log("pinging initial page");
      const response = await fetch(
        "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=IGQVJWMXhpS3kwZAGJDMVJJc0FwNWxFQWNVU3hzWGY4akxZAeUEwT01PYUhacThLSVZAXbG9KUEJKZA1BaUS15MEVzaXRIamNiT05OejIzS2kyVExJYkJia3JxZATdBenhiMHB4NkhoUXE2dDBXeUdXckYwWAZDZD&limit=100"
      );
      postData = await response.json();
      console.log("post 0's caption: " + postData.data[0].caption);
      setNextURL(postData.paging.next);
      setInitMediaIsSet(true);
      setAllPosts(postData.data);
    }
  };

  /*get the next page of posts*/
  const getUserMedia = async () => {
    console.log("pinging next page with next url " + nextURL);
    const response = await fetch(nextURL);
    postData = await response.json();
    console.log("post O's caption: " + postData.data[0].caption);
    setNextURL(postData.paging.next);
    setAllPosts(postData.data);
  };

  /*when the month & year has been selected, turn it into a format that matches the date value from Instagram's API*/
  useEffect(() => {
    if (monthSelectedBool && yearSelectedBool) {
      getMonthYearCombo();
    }
  }, [monthSelected, yearSelected]);

  /*once the date has been formatted, either execute a new search or continue with the current search*/
  useEffect(() => {
    if (monthYearCombo != "") {
      if (allPosts.length == 0) {
        initUserMedia();
      } else {
        filterByDate();
      }
    }
  }, [monthYearCombo]);

  /*if allPosts has been updated (ie it got updated with the next page of posts) then try to filterbyDate again*/
  useEffect(() => {
    if (initMediaIsSet && monthYearCombo != "") {
      filterByDate();
    }
  }, [allPosts]);

  const dropdownOptions = [
    {
      id: 1,
      value: "Date",
    },
    {
      id: 2,
      value: "People Tagged",
    },
    {
      id: 3,
      value: "Location",
    },
  ];

  const handleDropdown = (selec) => {
    setSelection(selec);
    showSelection();
  };

  const handleMonthDropdown = (selec) => {
    console.log(selec);
    setMonthSelected(selec);
    setMonthSelectedBool(true);
  };

  const handleYearDropdown = (selec) => {
    console.log(selec);
    setYearSelected(selec);
    setYearSelectedBool(true);
  };

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
      id: 11,
      value: "2020",
    },
    {
      id: 12,
      value: "2021",
    },
  ];

  /*function for formatting the month and date selection to match the date value from Instagram's API*/
  const getMonthYearCombo = () => {
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

  const showSelection = () => {
    //currently just support 1 selection, will implement multiple selections later
    let valueArr = [];
    for (let i = 0; i < selection.length; i++) {
      switch (selection[i].value) {
        case "Date":
          setDateSearch(true);
          break;
        case "People Tagged":
          setPeopleSearch(true);
          break;
        case "Location":
          setLocationSearch(true);
          break;
      }
      valueArr.push(selection[i].value);
    }
    if (selection.length == 0) {
      setDateSearch(false);
      setPeopleSearch(false);
      setLocationSearch(false);
    } else {
      for (let i = 0; i < valueArr.length; i++) {
        if (!valueArr.includes("Date")) {
          setDateSearch(false);
        } else if (!valueArr.includes("People Tagged")) {
          setPeopleSearch(false);
        } else if (!valueArr.includes("Location")) {
          setLocationSearch(false);
        }
      }
    }
  };

  /*function for filtering posts by date*/
  const filterByDate = async () => {
    setDoneFiltering(false);
    setFilteredPosts([]);
    console.log("filtering by date");
    let dateSearched = monthYearCombo;
    console.log("datesearched: " + dateSearched);

    let tempFilteredPosts = [];
    /*search through allPosts to see if there are any posts within the selected date*/
    if (allPosts.length != 0) {
      allPosts.map((post) => {
        if (post.timestamp.substring(0, 7) === dateSearched) {
          tempFilteredPosts.push(post);
        }
      });
    }
    /*if no posts were found with the selected date, get the next page of posts to see if any posts there have a matching date*/
    if (tempFilteredPosts.length == 0) {
      getUserMedia();
    } else {
      /*checking for 'overflow', ie check if there are more/additional matching posts on the next page */
      let lastPost = allPosts[allPosts.length - 1];
      if (lastPost.timestamp.substring(0, 7) === dateSearched) {
        getUserMedia();
      } else {
        /*done filtering*/
        setFilteredPosts(tempFilteredPosts);
        setDoneFiltering(true);
        console.log("done filtering");

        /*reset search*/
        setMonthSelected("");
        setMonthSelectedBool(false);
        setYearSelected("");
        setYearSelectedBool(false);
        setMonthYearCombo("");
        setNextURL("");
        setInitMediaIsSet(false);
        setAllPosts([]);
      }
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Instagram Feed Search</h1>
      </header>
      <div>
        <Dropdown
          title="Search by"
          items={dropdownOptions}
          multiSelect={false}
          handleDropdown={handleDropdown}
        />
        {showDateSearch && (
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
        )}
        {doneFiltering && <Posts postData={filteredPosts} />}
      </div>
    </div>
  );
}

export default App;
