"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { projectValidationSchema } from "./schema/projectValidation";
import { AiFillCloseCircle } from "react-icons/ai";
import projectServices from "@/firebase/services/projectServices";
import { triggerRender } from "@/slice/projectSlice";
import { useDispatch } from "react-redux";
import { auth } from "@/firebase/firebase";

export default function AddNewProjectModal({ modalState, changeModalState }) {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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

  function closeModalHandler() {
    changeModalState();
  }

  const formik = useFormik({
    initialValues: {
      project_name: "",
      created_at: new Date().toDateString(),
      updated_at: "",
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        user_id: user,
      };

      const addProject = async () => {
        const newProduct = await projectServices.addProject(updatedValues);
      };

      await addProject();
      dispatch(triggerRender());
    },
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    closeModalHandler();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="modal_id_1"
        className="modal-toggle"
        onChange={() => modalState}
        checked={modalState}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="modal_id_1"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <button onClick={closeModalHandler}>
              <AiFillCloseCircle size={30} />
            </button>
          </label>
          {/* FORM CONTENT */}
          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col gap-5 p-5"
          >
            {formik.errors.project_name && formik.touched.project_name ? (
              <span className=" text-red-500">
                {formik.errors.project_name}
              </span>
            ) : null}
            <input
              type="text"
              value={formik.values.project_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="project_name"
              placeholder="enter project name"
              className="input input-bordered w-full max-w-xs bg-neutral"
            />
            <input
              type="date"
              name="created_at"
              // defaultValue={formik.values.created_at}
              value={formik.values.created_at}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="starting date"
              className="input input-bordered w-full max-w-xs bg-neutral"
            />
            <button type="submit" className="btn w-full max-w-xs">
              Save
            </button>
          </form>
          {/* FORM CONTENT */}
        </div>
      </div>
    </div>
  );
}
