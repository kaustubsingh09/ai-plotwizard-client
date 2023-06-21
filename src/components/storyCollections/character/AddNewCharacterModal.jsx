import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import characterServices from "@/firebase/services/characterServices";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
// import { triggerCharacterRender } from "@/slice/characterSlice";
import { triggerRender } from "@/slice/projectSlice";

export default function AddNewCharacterModal({
  currentState,
  changeModalState,
  projectId,
}) {
  const closeModal = () => {
    changeModalState();
  };

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      character_name: "",
      created_at: new Date().toDateString(),
      updated_at: "",
      backstory: "",
      appearance: "",
    },
    // validationSchema: projectValidationSchema,
    onSubmit: async (values) => {
      const updatedValues = {
        ...values,
        project_id: projectId,
      };

      const addCharacter = async () => {
        const newCharacter = await characterServices.addcharacter(
          updatedValues
        );
      };

      await addCharacter();
      dispatch(triggerRender());
    },
  });

  const formSubmitHandler = (e) => {
    e.preventDefault();
    formik.handleSubmit();
    closeModal();
  };

  return (
    <div>
      <input
        type="checkbox"
        id="modal_id_2"
        className="modal-toggle"
        onChange={() => currentState}
        checked={currentState}
      />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <label
            htmlFor="modal_id_2"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            <button onClick={closeModal}>
              <AiFillCloseCircle size={30} />
            </button>
          </label>
          {/* FORM CONTENT */}
          <form
            onSubmit={formSubmitHandler}
            className="flex flex-col gap-5 p-5"
          >
            <input
              type="text"
              value={formik.values.character_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="character_name"
              placeholder="enter character name"
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
              onClick={closeModal}
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
