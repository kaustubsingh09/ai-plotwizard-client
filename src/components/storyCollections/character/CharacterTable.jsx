"use client";
import React, { useState, useEffect } from "react";
import { AiFillFolderAdd } from "react-icons/ai";
import AddNewCharacterModal from "./AddNewCharacterModal";
import characterServices from "@/firebase/services/characterServices";
import { useSelector } from "react-redux";
import CharacterDetailModal from "./CharacterDetailModal";

export default function CharacterTable({ projectId }) {
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [allCharacters, setAllCharacters] = useState([]);
  const [characterById, setCharacterById] = useState([]); //FILTERS ALL THE CHARACTERS BY THEIR RESPECTIVE ID's
  const [characterId, setCharacterId] = useState(null);
  const [openCharacterDetailModal, setOpenCharacterDetailModal] =
    useState(false);

  const countCharacter = useSelector((value) => value.projectSlice.count);

  function closeModal() {
    setOpenModal(!openModal);
  }

  function closeCharacterDetailModal() {
    setOpenCharacterDetailModal(!openCharacterDetailModal);
  }

  const getCharacters = async () => {
    const data = await characterServices.getAllcharacters(projectId);
    const character = data?.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAllCharacters(character);
    setIsLoading(false);
  };

  const getCharacterById = (id) => {
    const character = allCharacters.find((el) => el.id === id);
    if (character) {
      setCharacterById(character);
    }
  };

  useEffect(() => {
    getCharacterById(characterId);
  }, [characterId]);

  useEffect(() => {
    if (projectId) {
      getCharacters();
    }
  }, [projectId, countCharacter]);

  return (
    <div className="flex flex-col">
      <div className="flex justify-center p-5 gap-5 items-center">
        <span className="font-bold">All Characters</span>
        <button onClick={() => setOpenModal(true)} className="btn">
          <div className="flex flex-row items-center gap-2">
            <AiFillFolderAdd size={20} />
            Add New
          </div>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Character Name</th>
              <th>Created_at</th>
              <th>Updated_at</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {allCharacters.length ? (
              allCharacters.map((el, index) => (
                <tr
                  className=" cursor-pointer"
                  key={el.id}
                  onClick={() => {
                    setCharacterId(el.id),
                      setOpenCharacterDetailModal(!openCharacterDetailModal);
                  }}
                >
                  <th>{index + 1}</th>
                  <td>{el.character_name}</td>
                  <td>{el.created_at}</td>
                  <td>{el.updated_at}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="17">
                  <h1 className="font-bold text-center mt-5">
                    No data to show, Please create a project
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AddNewCharacterModal
        projectId={projectId}
        currentState={openModal}
        changeModalState={closeModal}
      />
      {openCharacterDetailModal && (
        <CharacterDetailModal
          currentState={openCharacterDetailModal}
          changeModalState={closeCharacterDetailModal}
          currentCharacterDetails={characterById}
        />
      )}
    </div>
  );
}
