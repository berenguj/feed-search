import React, { useState } from "react";
import "./App.css";
import Dropdown from "./Dropdown";
import DateSearch from "./DateSearch";

function App() {
  const [selection, setSelection] = useState([]);

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
      <DateSearch showDateSearch={true} />
    </div>
  );
}

export default App;
