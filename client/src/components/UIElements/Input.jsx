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
    value,
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
        value={value || inputValue}
      ></input>
    </div>
  );
};

export default Input;
