"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import projectServices from "@/firebase/services/projectServices";
import { GrLinkPrevious } from "react-icons/gr";
import RenderAllCharacters from "@/components/storyCollections/character/RenderAllCharacters";
import DeleteModal from "@/components/DeleteModal";

export default function Project({ params }) {
  const projectId = params.projectId;
  const [individualProject, setIndividualProject] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const getSingleProjectById = async () => {
    try {
      const data = await projectServices.getSingleProject(projectId);
      setIndividualProject(data.data());
      // setProjectName(data.data().project_name);
      const projectFullName = data.data().project_name;
      if (projectFullName) {
        setProjectName(projectFullName);
      }

      if (data) {
        setIsLoading(false);
      }
    } catch (err) {
      console.log("error while fetching project", err);
      setIsLoading(false);
    }
  };
  const deleteProjectHandler = async () => {
    await projectServices.deleteProject(projectId);
    router.back();
  };

  useEffect(() => {
    if (projectId) {
      getSingleProjectById();
    }
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-10 ">
      <div className="flex flex-row gap-3 justify-center text-neutral-content rounded-xl">
        <ul className="menu menu-horizontal bg-base-200 rounded-box">
          <li>
            {individualProject && (
              <span className="font-bold">
                {individualProject?.project_name}
              </span>
            )}
          </li>
          <li>
            <button
              onClick={() => router.back()}
              className="tooltip"
              data-tip="Filter"
            >
              <div className="flex flex-row gap-2 ">
                <GrLinkPrevious size={20} />
                <span className=" font-semibold">Go Back</span>
              </div>
            </button>
          </li>
          <li>
            <DeleteModal
              deleteAction={deleteProjectHandler}
              projectName={projectName}
            />
          </li>
        </ul>
      </div>
      <div>
        <RenderAllCharacters projectId={projectId} />
      </div>
    </div>
  );
}
