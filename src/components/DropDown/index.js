import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import "components/DropDown/index.scss"

function DropDown({ placeholder = '', items, onChangeItem }) {

  const dropdownRef = useRef(null)

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownRef]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleOptionClick(option) {
    if (option !== selectedOption) {
      setSelectedOption(option);
      setIsOpen(false);
      onChangeItem(option)
    }
  }

  return (
    <div className="drop-down" ref={dropdownRef}>
      <div className="drop-down-header" onClick={toggleDropdown}>
        <div>{selectedOption || placeholder}</div>
        <ArrowDropDownIcon className={classNames('drop-down-arrow', {'drop-down-arrow-rotate': isOpen})} />
      </div>
      {isOpen &&
        <div className="drop-down-container">
          <div className={classNames('drop-down-container-items', {'drop-down-container-selected-item': 'All' === selectedOption})} onClick={() => handleOptionClick('All')}>All</div>
          {items.map((item) => (
            <div className={classNames('drop-down-container-items', {'drop-down-container-selected-item': item === selectedOption})} key={item} onClick={() => handleOptionClick(item)}>{item}</div>
          ))}
        </div>
      }
    </div>
  );
}

export default DropDown;