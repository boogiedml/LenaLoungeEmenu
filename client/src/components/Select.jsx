import React from "react";

const Select = ({
  label,
  name,
  icon,
  option,
  onChange,
  defaultValue,
  onBlur,
}) => {
  return (
    <div className="mb-3">
      <label className="block text-sm" htmlFor={name}>
        {label}
      </label>
      <div className="relative">
        <select
          className="w-full mt-2 py-2 px-4 pl-10 bg-white text-black outline-none"
          name={name}
          id={name}
          onChange={onChange}
          defaultValue={defaultValue} // Use value instead of defaultValue
          onBlur={onBlur}
        >
          <option value="">{label}</option>
          {option.map((o) => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
        <span className="absolute left-2.5 top-4 p-1 bg-myBrown">{icon}</span>
      </div>
    </div>
  );
};

export default Select;
