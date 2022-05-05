import React, { useState } from "react";
import "./Search.css";
import { VscSearch } from "react-icons/vsc";

interface Props {
  onValueChanged: (newValue: string) => void;
}

export const Search: React.FC<Props> = ({ onValueChanged }) => {
  const [inputVisible, setInputVisible] = useState(false);
  const [InputValue, setInputValue] = useState("");

  const handleIconClick = () => {
    setInputVisible(prev => !prev);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    onValueChanged(e.target.value);
  };

  return (
    <div className="search-component">
      <div className="icon" onClick={handleIconClick}>
        <VscSearch />
      </div>
      {inputVisible && (
        <input
          className="input"
          type="text"
          value={InputValue}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};
