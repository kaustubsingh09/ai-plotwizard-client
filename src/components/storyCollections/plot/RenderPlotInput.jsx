"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import plotServices from "@/firebase/services/plotServices";

export default function RenderPlotInput({ projectId }) {
  const [allPlot, setAllPlot] = useState([]);
  const [plotId, setPlotId] = useState([]);

  const formik = useFormik({
    initialValues: {
      plot_details: "",
      created_at: new Date().toDateString(),
      updated_at: "",
    },
    onSubmit: async (values) => {
      try {
        const updatedValues = {
          ...values,
          project_id: projectId,
        };

        if (plotId) {
          const addPlot = async () => {
            const newPlot = await plotServices.updateplot(
              plotId,
              updatedValues
            );
          };
          await addPlot();
        } else {
          const plot = async () => {
            const firstPlot = await plotServices.addplot(updatedValues);
          };
          await plot();
        }
      } catch (err) {
        console.log("error while creating plot", err);
      }
    },
  });

  const getAllPlots = async () => {
    const plot = await plotServices.getAllplot(projectId);
    const allPlots = plot?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const plotId = allPlot.map((el) => el.id);
    setAllPlot(allPlots);
    setPlotId(plotId[0]);
  };

  useEffect(() => {
    getAllPlots();
  }, [plotId]);

  useEffect(() => {
    formik.setValues({
      plot_details: allPlot.map((el) => el.plot_details),
    });
  }, [allPlot]);

  const savePlotHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex justify-center flex-col items-center gap-3">
        <span className="font-semibold">Story Plot</span>
        <form
          onSubmit={savePlotHandler}
          className="flex flex-col justify-center gap-2"
          action=""
        >
          <textarea
            className="textarea"
            name="plot_details"
            onChange={formik.handleChange}
            value={formik.values.plot_details}
            onBlur={formik.handleBlur}
            cols={40}
            rows={10}
            placeholder="start writing plot of story..."
          ></textarea>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
