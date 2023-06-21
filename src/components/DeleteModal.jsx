"use client";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

export default function DeleteModal({ deleteAction, projectName }) {
  return (
    <div className="tooltip" data-tip="Delete">
      <button onClick={() => window.my_modal_1.showModal()}>
        <AiFillDelete size={20} />
      </button>
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
            {/* if there is a button in form, it will close the modal */}
          <div className="modal-action">
            <button>
              <AiFillCloseCircle size={30} />
            </button>
          </div>
          <h3 className="font-bold text-lg">
            Are you sure to delete project{" "}
            <span className=" text-red-500">{projectName}</span>?
          </h3>
          <p className="py-4">
            <button onClick={() => deleteAction()} className="btn">
              Confirm
            </button>
          </p>
        </form>
      </dialog>
    </div>
  );
}
