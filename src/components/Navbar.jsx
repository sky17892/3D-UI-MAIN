import React from "react";
import { appleImg, bagImg, searchImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="w-full py-5 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width justify-between">
        <img src={appleImg} alt="" className="w-[14px] h-[18px]" />

        <div className="flex justify-center">
          {navLists.map((nav, idx) => (
            <div
              key={idx}
              className="px-5 text-sm cursor-pointer text-gray-400 hover:text-white"
            >
              {nav}
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-3">
          <img src={searchImg} alt="" className="w-[18px] h-[18px]" />
          <img src={bagImg} alt="" className="w-[18px] h-[18px]" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
