import React from "react";

const Select = (props) => {
  const {
    options,
    selectName,
    selectId,
    selectStyle,
    labelName,
    labelStyle,
    onChange,
  } = props;

  return (
    <div className="flex justify-between items-center">
      <label className={labelStyle} htmlFor={selectId}>
        {labelName}
      </label>
      <select
        className={selectStyle}
        name={selectName}
        id={selectId}
        onChange={onChange}
      >
        {options.map(({ id, name }) => {
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
