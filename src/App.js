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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [doneFiltering, setDoneFiltering] = useState(false);
  let postData = [];
  //let filteredPosts = [];
  //let monthYearCombo = "";

  useEffect(() => {
    getUserMedia();
  }, []);

  const getUserMedia = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=IGQVJWMXhpS3kwZAGJDMVJJc0FwNWxFQWNVU3hzWGY4akxZAeUEwT01PYUhacThLSVZAXbG9KUEJKZA1BaUS15MEVzaXRIamNiT05OejIzS2kyVExJYkJia3JxZATdBenhiMHB4NkhoUXE2dDBXeUdXckYwWAZDZD&limit=100"
    );
    postData = await response.json();
    console.log(postData.data);
    setAllPosts(postData.data);
  };

  useEffect(() => {
    if (monthSelectedBool && yearSelectedBool) {
      getMonthYearCombo();
    }
  }, [monthSelected, yearSelected]);

  useEffect(() => {
    console.log(monthYearCombo);
    if (monthYearCombo != "") {
      filterByDate();
    }
  }, [monthYearCombo]);

  const getIdUsername = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/?fields=id,username&access_token=IGQVJVQWx6X0tkM1BncGR1WXh6TDVCbzY2SWpFVGp4dXdUMWotWmEwalJvc29VNV9MQ1AwbmQzdGQzbGszYVZANSUpPQ3lTX0ZAIblBsT3ZAvX01ucjJQOVFFb3dqWXF4aFplbmFCdzVodkx2SEttbm44TAZDZD"
    );
    const data = await response.json();
    console.log(data);
  };

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

  const filterByDate = async () => {
    console.log("filtering by date");
    let dateSearched = monthYearCombo;
    console.log("datesearched: " + dateSearched);
    let tempFilteredPosts = [];
    allPosts.map((post) => {
      if (post.timestamp.substring(0, 7) === dateSearched) {
        //console.log(post);
        //setFilteredPosts([...filteredPosts, post]);
        tempFilteredPosts.push(post);
      }
    });
    console.log(filteredPosts);
    setFilteredPosts(tempFilteredPosts);
    setDoneFiltering(true);
    console.log("done filtering");
    return true;
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
