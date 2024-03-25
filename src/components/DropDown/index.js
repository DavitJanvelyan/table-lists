import React, { useEffect, useRef, useState } from "react";

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

  function arrowStyle() {
    return ['drop-down-arrow', isOpen ? 'drop-down-arrow-rotate' : ''].join(' ');
  }

  function selectedItemStyle(selected) {
    return ['drop-down-container-items', selected === selectedOption ? 'drop-down-container-selected-item' : ''].join(' ');
  }

  return (
    <div className="drop-down" ref={dropdownRef}>
      <div className="drop-down-header" onClick={(event) => toggleDropdown(event)}>
        <div>{selectedOption || placeholder}</div>
        <ArrowDropDownIcon className={arrowStyle()} />
      </div>
      {isOpen &&
        <div className="drop-down-container">
          <div className={selectedItemStyle('All')} onClick={() => handleOptionClick('All')}>All</div>
          {items.map((item) => (
            <div className={selectedItemStyle(item)} key={item} onClick={() => handleOptionClick(item)}>{item}</div>
          ))}
        </div>
      }
    </div>
  );
}

export default DropDown;