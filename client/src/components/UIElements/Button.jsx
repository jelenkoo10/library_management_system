import React from "react";

const Button = (props) => {
  const { btnStyle, btnText } = props;

  return <button className={btnStyle}>{btnText}</button>;
};

export default Button;
