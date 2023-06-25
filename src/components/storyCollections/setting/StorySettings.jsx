"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import settingServices from "@/firebase/services/settingServices";

export default function StorySettings({ projectId }) {
  const [previousSettings, setPreviousSettings] = useState([]);
  const [settingId, setSettingId] = useState([]);

  const formik = useFormik({
    initialValues: {
      setting_details: "",
      created_at: new Date().toDateString(),
      updated_at: "",
    },
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        project_id: projectId,
      };

      const addSetting = async () => {
        const newSetting = await settingServices.updatesetting(
          settingId,
          updatedValues
        );
      };
      await addSetting();
    },
  });

  const getSavedSettings = async () => {
    const settings = await settingServices.getAllsettings(projectId);
    const allSettings = settings?.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPreviousSettings(allSettings);
    // setSettingId(allSettings.id);
    const settingId = allSettings.map((el) => el.id);
    setSettingId(settingId[0]);
  };

  useEffect(() => {
    getSavedSettings();
  }, []);

  useEffect(() => {
    formik.setValues({
      setting_details: previousSettings.map((el) => el.setting_details) || "",
    });
  }, [previousSettings]);

  const saveStorySettingHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className="flex flex-col bg-gray-800 p-5">
      <div className="flex justify-center flex-col items-center gap-3">
        <span className="font-semibold">Story Settings</span>
        <form
          onSubmit={saveStorySettingHandler}
          className="flex flex-col justify-center gap-2"
          action=""
        >
          <textarea
            name="setting_details"
            onChange={formik.handleChange}
            value={formik.values.setting_details}
            onBlur={formik.handleBlur}
            className="textarea"
            cols={45}
            rows={5}
            placeholder="any specific setting of story..."
          ></textarea>
          <button className="btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
