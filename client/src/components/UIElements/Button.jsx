import React from "react";

const Button = (props) => {
  const { btnStyle, btnText, type, onClick } = props;

  return (
    <button className={btnStyle} type={type} onClick={onClick}>
      {btnText}
    </button>
  );
};

export default Button;
