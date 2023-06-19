"use client";
import React, { useState, useEffect } from "react";
import projectServices from "@/firebase/services/projectServices";
import { auth } from "@/firebase/firebase";
import { useSelector } from "react-redux";

export default function DataTable() {
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const count = useSelector((value) => value.projectSlice.count);

  const getProjects = async () => {
    const data = await projectServices.getAllProjects(user);
    setAllProjects(data?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    if (data) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const uid = currentUser.uid;
        setUser(uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  useEffect(() => {
    if (user) {
      getProjects();
    }
  }, [user, isLoading, count]);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-dots loading-md"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-10">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Project Name</th>
            <th>Created at</th>
            <th>Updated at</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {user?.length ? (
            allProjects?.map((el, index) => (
              <tr key={el.id}>
                <th>{index + 1}</th>
                <th>{el.project_name}</th>
                <td>{el.created_at}</td>
                <td>{el.updated_at}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="17">
                <h1 className="font-bold">
                  No data to show, Please create a project
                </h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
