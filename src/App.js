import React, { useState, useEffect } from "react";
import "./App.css";
import Dropdown from "./Dropdown";
import DateSearch from "./DateSearch";
import Posts from "./Posts";

function App() {
  const [selection, setSelection] = useState([]);
  const [showDateSearch, setDateSearch] = useState(false);
  const [showPeopleSearch, setPeopleSearch] = useState(false);
  const [showLocationSearch, setLocationSearch] = useState(false);
  const [posts, setPosts] = useState([]);
  const [test, setTests] = useState(0);
  let postData = [];

  useEffect(() => {
    getIdUsername();
    getUserMedia();
    testFunc2();
  }, []);
  useEffect(() => {
    testFunc2();
  }, [test]);

  const getUserMedia = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url&access_token=IGQVJVQ2d1YU9ISVk0T2h3TkVEUmpraEctTS1wZAWxvM3Q3aVIzT19NaUwwRWFhUV9lUnU0bmJIREdPeFNIX0lERm9fNFE4bnRLVHgxQ1A5SUx1bVlGUzZALdlB2SHhKOVIyY0hIellR"
    );
    postData = await response.json();
    console.log(postData);
    setPosts(postData);
    console.log(postData.data.length);
  };

  const getIdUsername = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/?fields=id,username&access_token=IGQVJVQ2d1YU9ISVk0T2h3TkVEUmpraEctTS1wZAWxvM3Q3aVIzT19NaUwwRWFhUV9lUnU0bmJIREdPeFNIX0lERm9fNFE4bnRLVHgxQ1A5SUx1bVlGUzZALdlB2SHhKOVIyY0hIellR"
    );
    const data = await response.json();
    console.log(data);
  };

  const testFunc2 = () => {
    console.log("test");
  };

  const testFunc = () => {
    setTests(test + 1);
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

  const showSelection = () => {
    //currently just support 1 selection, will implement multiple selections later
    console.log(selection.length);
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

  const isIMAGE = (post) => {
    if ("IMAGE" == post.media_type) {
      return true;
    }
    return false;
  };

  const postDataPresent = () => {
    console.log(posts);
    if (posts.data != null) {
      console.log("in if");
      return true;
    }
    return false;
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
          multiSelect={true}
          handleDropdown={handleDropdown}
        />
      </div>
      <button onClick={testFunc}>test</button>
      <DateSearch showDateSearch={showDateSearch} />
      <div>{postDataPresent() ? <Posts postData={posts.data} /> : null}</div>
    </div>
  );
}

export default App;
