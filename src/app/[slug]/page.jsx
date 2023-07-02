"use client";
import React, { useState, useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { BsFilter } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import AllProjectsTable from "@/components/AllProjectsTable";
import AddNewProjectModal from "@/components/AddNewProjectModal";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
import { useRouter } from "next/navigation";

export default function User({ params }) {
  const [addNewProject, setAddNewProject] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const router = useRouter();

  function addNewProjectModalHandler() {
    setAddNewProject(!addNewProject);
  }

  const user = () =>
    onAuthStateChanged(auth, (state) => {
      const user = state?.displayName;
      setCurrentUser(user);
      if (!user) {
        router.push("/");
      }
    });

  useEffect(() => {
    user();
  }, [currentUser]);

  return (
    <div className="flex flex-col mt-10">
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
