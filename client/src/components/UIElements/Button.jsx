import React from "react";

const Button = (props) => {
  const { btnStyle, btnText, type } = props;

  return (
    <button className={btnStyle} type={type}>
      {btnText}
    </button>
  );
};

export default Button;
