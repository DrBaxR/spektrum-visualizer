import React, { useState } from "react";
import "./Search.css";
import { VscSearch } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";

interface Props {
  onValueChanged: (newValue: string) => void;
}

export const Search: React.FC<Props> = ({ onValueChanged }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const changeInputValue = (newValue: string) => {
    setInputValue(newValue);
    onValueChanged(newValue);
  };

  const handleIconClick = () => {
    setInputVisible(prev => !prev);
  };

  const handleInputChange = (e: any) => {
    changeInputValue(e.target.value);
  };

  const handleCancelButtonClick = () => {
    changeInputValue("");
  };

  return (
    <div className="search-component">
      <div className="icon" onClick={handleIconClick}>
        <VscSearch />
      </div>
      {inputVisible && (
        <div className="search-field">
          <input
            autoFocus
            className="input"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputValue !== "" && (
            <div className="cancel-icon" onClick={handleCancelButtonClick}>
              <MdCancel />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
