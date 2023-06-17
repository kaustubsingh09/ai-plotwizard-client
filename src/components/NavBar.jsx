import React from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogoIonitron } from "react-icons/io";

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="flex-1 items-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <IoLogoIonitron size={30} />
          Plot<span className=" text-gray-400">Wizard</span>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            <RxHamburgerMenu />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-gray-700  rounded-box w-52"
          >
            <li>
              <Link href="/login" className="text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="text-white">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
