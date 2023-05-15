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
    <>
      {options && (
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
            {options.map((option) => {
              return (
                <option value={option.id} key={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </div>
      )}
    </>
  );
};

export default Select;
