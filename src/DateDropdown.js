import React, { useState, useEffect, useRef } from "react";
import "./App.scss";

const DateDropdown = ({
  title,
  items = [],
  multiSelect = false,
  handleDropdown,
}) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const didMount = useRef(false);
  const toggle = () => setOpen(!open);

  useEffect(() => {
    if (didMount.current) {
      passSelection();
    } else {
      didMount.current = true;
    }
  }, [selection]);

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
  };

  const isItemInSelection = (item) => {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  };

  const passSelection = () => {
    handleDropdown(selection[0]);
  };

  return (
    <div className="dd-wrapper-month">
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

export default DateDropdown;
