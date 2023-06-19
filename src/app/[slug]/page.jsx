"use client";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import AllProjectsTable from "@/components/AllProjectsTable";
import AddNewProjectModal from "@/components/AddNewProjectModal";

export default function User({ params }) {
  const [addNewProject, setAddNewProject] = useState(false);

  function addNewProjectModalHandler() {
    setAddNewProject(!addNewProject);
  }

  return (
    <div className="flex flex-col mt-10 ">
      <div className="flex flex-row gap-3 justify-center text-neutral-content rounded-xl">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            <button
              onClick={addNewProjectModalHandler}
              className="tooltip"
              data-tip="Add New Project"
            >
              <AiOutlinePlus size={25} />
            </button>
          </li>
          <li>
            <button className="tooltip" data-tip="Filter">
              <BsFilter size={25} />
            </button>
          </li>
          <li>
            <button className="tooltip" data-tip="Search">
              <BiSearchAlt size={25} />
            </button>
          </li>
        </ul>
      </div>
      <AllProjectsTable />

      <AddNewProjectModal
        modalState={addNewProject}
        changeModalState={addNewProjectModalHandler}
      />
    </div>
  );
}
