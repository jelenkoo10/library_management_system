import React from "react";

const Input = (props) => {
  const { inputId, inputStyle, labelStyle, divStyle, inputType, inputLabel } =
    props;

  return (
    <div className={divStyle}>
      <label htmlFor={inputId} className={labelStyle}>
        {inputLabel}
      </label>
      <input id={inputId} className={inputStyle} type={inputType}></input>
    </div>
  );
};

export default Input;
