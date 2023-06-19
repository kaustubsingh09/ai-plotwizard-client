import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import AllProjectsTable from "@/components/AllProjectsTable";

export default function User({ params }) {
  return (
    <div className="flex flex-col mt-10 ">
      <div className="flex flex-row justify-center text-neutral-content rounded-xl">
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
        <button className="btn ml-2 max-w-xs">
          <BsFilter size={30} className="" />
          <span>Filter</span>
        </button>
      </div>
      <AllProjectsTable />
    </div>
  );
}
