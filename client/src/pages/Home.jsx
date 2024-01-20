import React, { useState, useRef } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../containers";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleMenuOptionClick = (menuOption) => {
    navigate(`/${menuOption}`);
  };

  const homeStyles = {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1619218005459-c8651c2f5918?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div
      style={homeStyles}
      className="bg-myBrown text-white w-full min-h-screen flex flex-col bg-opacity-90"
    >
      <Navbar hamburgerColor="#FFF" />
      <section className="flex-grow flex items-center justify-center z-10">
        <button
          type="button"
          onClick={handleMenuClick}
          className="py-2 px-8 mb-28 text-sm lg:text-[15px] bg-white text-black hover:border-2 border-black transition-all duration-300"
        >
          Menu
        </button>
      </section>
      {isMenuOpen && (
        <div
          className="overlay absolute bg-black bg-opacity-50 w-full h-full flex items-center justify-center z-[150]"
          ref={menuRef}
        >
          <div className="bg-modalBackgoundColor w-[95%] md:w-[500px] lg:w-[700px] text-black px-2 md:px-4 pb-4 pt-16 flex flex-col gap-2 relative">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-2 right-2 rounded-full p-2"
            >
              <RiCloseLine color="#000" className="text-xl" />
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-base font-[500] transition-all duration-300 p-2 md:p-3"
              onClick={() => handleMenuOptionClick("meals")}
            >
              Meals
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-base font-[500] transition-all duration-300 p-2 md:p-3"
              onClick={() => handleMenuOptionClick("drinks")}
            >
              Drinks
            </button>
            <button
              className="bg-gray-100 hover:bg-gray-200 text-base font-[500] transition-all duration-300 p-2 md:p-3"
              onClick={() => handleMenuOptionClick("others")}
            >
              Others
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
