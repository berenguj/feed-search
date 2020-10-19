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
  //const [filteredPosts, setFilteredPosts] = useState([]);
  let filteredPosts = [];
  let postData = [];

  useEffect(() => {
    getIdUsername();
    getUserMedia();
  }, []);

  const getUserMedia = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,timestamp&access_token=IGQVJVQ2d1YU9ISVk0T2h3TkVEUmpraEctTS1wZAWxvM3Q3aVIzT19NaUwwRWFhUV9lUnU0bmJIREdPeFNIX0lERm9fNFE4bnRLVHgxQ1A5SUx1bVlGUzZALdlB2SHhKOVIyY0hIellR"
    );
    postData = await response.json();
    setPosts(postData);
  };

  const getIdUsername = async () => {
    const response = await fetch(
      "https://graph.instagram.com/me/?fields=id,username&access_token=IGQVJVQ2d1YU9ISVk0T2h3TkVEUmpraEctTS1wZAWxvM3Q3aVIzT19NaUwwRWFhUV9lUnU0bmJIREdPeFNIX0lERm9fNFE4bnRLVHgxQ1A5SUx1bVlGUzZALdlB2SHhKOVIyY0hIellR"
    );
    const data = await response.json();
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
      return true;
    }
    return false;
  };

  const filterByDate = () => {
    let dateSearched = "2020-07";
    posts.data.map((post) => {
      if (post.timestamp.substring(0, 7) === dateSearched) {
        filteredPosts.push(post);
      }
    });
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
          multiSelect={true}
          handleDropdown={handleDropdown}
        />
      </div>
      <DateSearch showDateSearch={showDateSearch} posts={posts.data} />
    </div>
  );
}

export default App;
