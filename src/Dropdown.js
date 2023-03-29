import { useState } from "react";

export default function Dropdown({ placeHolder, options, updateSortOption }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const sortCriteria =
    selectedOption === null ? placeHolder : selectedOption.label;

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectOption = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
    updateSortOption(option); // call parent function to send this option to it
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-input" onClick={toggleDropdown}>
        {" "}
        {sortCriteria}{" "}
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          {options.map((option) => {
            return (
              <div
                key={option.id}
                onClick={() => selectOption(option)}
                className="dropdown-item"
                value={option.id}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
