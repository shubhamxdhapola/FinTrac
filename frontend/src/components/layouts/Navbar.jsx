import React, { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import Sidemenu from "./Sidemenu";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blue-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center justify-between flex-1">
        <h2 className="text-lg font-semibold text-black">FinTrac</h2>
        <button
          className="block lg:hidden text-black cursor-pointer"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl " />
          ) : (
            <HiOutlineMenu className="text-2xl " />
          )}
        </button>
      </div>

      <div
        className={`fixed top-[61px] -ml-4 bg-white duration-300 ${
          openSideMenu ? "left-4" : "-left-[100vw]"
        }`}
      >
        <Sidemenu activeMenu={activeMenu} />
      </div>
    </div>
  );
};

export default Navbar;
