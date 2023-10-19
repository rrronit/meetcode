import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = ({ selectedLanguage, setSelectedLanguage }) => {
  const languages = [
    "Java",
    "Python",
    "C++",
    "C",
    "JavaScript",
    "Swift",
    "Go",
    "Typescript",
    "Php",
    "Rust",
  ];
  const [showOptions, setShowOptions] = useState(false);
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setShowOptions(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="relative mb-4 bg-neutral-800">
      <div className="dropdown-container z-10 bg-neutral-800">
        <div className="dropdown absolute bg-neutral-800" ref={dropdownRef}>
          <div 
            className="selected-option"
            onClick={() => setShowOptions(!showOptions)}
          >
            {selectedLanguage} ▼
          </div>
          {showOptions && (
            <div className="options">
              {languages.map((language) => (
                <div 
                  key={language}
                  className="option"
                  onClick={() => handleLanguageChange(language)}
                >
                  {language}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
