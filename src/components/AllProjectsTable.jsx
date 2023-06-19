"use client";
import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import projectServices from "@/firebase/services/projectServices";
import { auth } from "@/firebase/firebase";

export default function AllProjectsTable() {
  const user = auth.currentUser?.uid;
  console.log(user);

  const [allProjects, setAllProjects] = useState([]);

  const getProjects = async () => {
    const data = await projectServices.getAllProjects(user);
    setAllProjects(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  console.log(allProjects);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user]);

  return <DataTable />;
}
