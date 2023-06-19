import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";

export default function User({ params }) {
  return (
    <div className="flex justify-center mt-10">
      <div className="flex justify-start navbar text-neutral-content w-1/4 rounded-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="input w-full max-w-xs bg-neutral pr-10"
          />
          <span className="absolute top-1/2 right-3 transform -translate-y-1/2">
            <BiSearchAlt size={30} className="text-gray-500" />
          </span>
        </div>
        {/* <button className="btn w-1/2">
          <BsFilter size={30} className="ml-20" />
          <span>Filter</span>
        </button> */}
      </div>
    </div>
  );
}
