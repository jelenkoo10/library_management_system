import React from "react";

const Input = (props) => {
  const { inputId, inputStyle, labelStyle, inputType, inputLabel } = props;

  return (
    <div className="flex justify-between w-[100%] items-center">
      <label htmlFor={inputId} className={labelStyle}>
        {inputLabel}
      </label>
      <input id={inputId} className={inputStyle} type={inputType}></input>
    </div>
  );
};

export default Input;
