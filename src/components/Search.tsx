import React, { ReactElement, useState } from "react";
import "./Search.css";
import { VscSearch } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";

interface Props {
  onValueChanged: (newValue: string) => void;
  extra: ReactElement;
}

export const Search: React.FC<Props> = ({ onValueChanged, extra }) => {
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
        <div className="hideable-fields">
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
          {
            <div style={{ display: "flex" }}>
              <div
                style={{
                  display: "grid",
                  placeItems: "center",
                  marginLeft: "10px"
                }}
              >
                <IoIosAddCircleOutline />
              </div>
              <div>{extra}</div>
            </div>
          }
        </div>
      )}
    </div>
  );
};
