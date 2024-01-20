import React from "react";

const Button = ({ label, type, onClick, active }) => {
  return (
    <button
      type={type ? type : "button"}
      onClick={onClick}
      className={`py-2 px-8 text-sm lg:text-[15px] ${
        active ? "text-white bg-[#3D0C11]" : "text-white bg-[#76453B]"
      } hover:bg-[#3D0C11] transition-all duration-300`}
    >
      {label}
    </button>
  );
};

export default Button;
