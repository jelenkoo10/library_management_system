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
    isAuthor,
    value,
    isBranch,
  } = props;

  return (
    <>
      {options && (
        <div className="flex justify-between items-center sm:items-start">
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
                <option
                  value={isBranch ? option._id : option.id}
                  key={option.id}
                  selected={option.id === value}
                >
                  {isAuthor ? `${option.name} ${option.surname}` : option.name}
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
