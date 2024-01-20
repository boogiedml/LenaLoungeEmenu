import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  let year = new Date();
  year = year.getFullYear();
  return (
    <div className="">
      <hr className="border-b-0 border-t-[.5px] border-myBrown" />
      <div className="w-full container m-auto px-5 md:px-0 lg:px-8 py-3">
        <p className="text-[13px] font-[400] text-black">
          © {year} <Link to="/">Lena</Link>, All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
