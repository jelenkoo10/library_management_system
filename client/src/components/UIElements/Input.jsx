import React from "react";

const Input = (props) => {
  const {
    inputId,
    inputStyle,
    labelStyle,
    divStyle,
    inputType,
    inputLabel,
    onChange,
    inputValue,
  } = props;

  return (
    <div className={divStyle}>
      <label htmlFor={inputId} className={labelStyle}>
        {inputLabel}
      </label>
      <input
        id={inputId}
        className={inputStyle}
        type={inputType}
        onChange={onChange}
        value={inputValue}
      ></input>
    </div>
  );
};

export default Input;
