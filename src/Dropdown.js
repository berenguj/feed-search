import React, { useState, useEffect } from "react";
import "./App.scss";

export const dropdownOptions = [
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

const Dropdown = ({
  title,
  items = [],
  multiSelect = false,
  handleDropdown,
}) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  const handleOnClick = (item) => {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
    }
    //handleDropdown(selection);
  };

  const passSelection = () => {
    handleDropdown(selection);
  };

  const isItemInSelection = (item) => {
    //handleDropdown(selection);
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >
        <div className="dd-header__title">
          <p className="dd-header__title--bold">{title}</p>
        </div>
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <>{passSelection()}</>
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && "Selected"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
