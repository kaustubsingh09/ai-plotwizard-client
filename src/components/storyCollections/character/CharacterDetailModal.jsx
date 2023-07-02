"use client";
import React, { useEffect } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { AiTwotoneDelete } from "react-icons/ai";
import { useFormik } from "formik";
import characterServices from "@/firebase/services/characterServices";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { triggerRender } from "@/slice/projectSlice";

export default function CharacterDetailModal({
  currentState,
  changeModalState,
  currentCharacterDetails,
}) {
  // const router = useRouter();
  const dispatch = useDispatch();

  function closeModal() {
    changeModalState();
  }

  const characterId = currentCharacterDetails?.id;
  const projectId = currentCharacterDetails?.project_id;

  function closeModal() {
    changeModalState();
  }

  const formik = useFormik({
    initialValues: {
      character_name: "",
      appearance: "",
      backstory: "",
      created_at: "",
    },

    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        project_id: projectId,
      };
      const updateCharacters = async () => {
        await characterServices.updatecharacter(characterId, updatedValues);
      };
      await updateCharacters();
      dispatch(triggerRender());
      closeModal();
    },
  });

  const deleteCharacter = async () => {
    await characterServices.deletecharacter(characterId);
    closeModal();
    dispatch(triggerRender());
  };

  useEffect(() => {
    if (currentCharacterDetails) {
      formik.setValues({
        character_name: currentCharacterDetails.character_name || "",
        backstory: currentCharacterDetails.backstory || "",
        appearance: currentCharacterDetails.appearance || "",
        created_at: currentCharacterDetails.created_at || "",
      });
    }
  }, [currentCharacterDetails]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="modal_id_4"
        className="modal-toggle"
        onChange={changeModalState}
        checked={currentState}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="modal_id_4"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <button onClick={closeModal}>
              <AiFillCloseCircle size={30} />
            </button>
          </label>
          {/* FORM CONTENT */}
          <div className="flex justify-center">
            <button
              onClick={deleteCharacter}
              className="btn flex flex-row gap-2"
            >
              <AiTwotoneDelete size={20} />
              <span>Delete character</span>
            </button>
          </div>
          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col gap-5 p-5"
          >
            <input
              type="text"
              name="character_name"
              value={formik.values.character_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Character Name"
              className="input input-bordered w-full max-w-xs bg-neutral"
            />
            <input
              type="text"
              name="backstory"
              value={formik.values.backstory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write some backstory of the character"
              className="input input-bordered w-full max-w-xs bg-neutral"
            />
            <input
              type="text"
              name="appearance"
              value={formik.values.appearance}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="describe appearance of character"
              className="input input-bordered w-full max-w-xs bg-neutral"
            />
            <button
              type="submit"
              // onClick={closeModal}
              className="btn w-full max-w-xs"
            >
              Save
            </button>
          </form>
          {/* FORM CONTENT */}
        </div>
      </div>
    </div>
  );
}
