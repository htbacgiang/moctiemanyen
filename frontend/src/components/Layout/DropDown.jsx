import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categoriesData, setDropDown }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const submitHandle = (i) => {
    navigate(`/products?category=${i.title}`);
    setDropDown(false);
    window.location.reload();
  };

  const handleInputChange = (event) => {
    if (event.target.value === " ") {
      setDropDown(false);
    } else {
      setDropDown(true);
    }
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm" ref={dropdownRef}>
      <input
        type="text"
        className="search-input"
        onChange={handleInputChange}
      />
      {categoriesData && dropdownRef.current && (
        <div className={`${styles.normalFlex} dropdown`}>
          {categoriesData.map((i, index) => (
            <div
              key={index}
              onClick={() => submitHandle(i)}
            >
              <img
                src={i.imageUrl}
                style={{
                  width: "25px",
                  height: "25px",
                  objectFit: "contain",
                  marginLeft: "10px",
                  userSelect: "none",
                }}
                alt=""
              />
              <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
