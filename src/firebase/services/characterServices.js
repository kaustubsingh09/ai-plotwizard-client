import { db } from "../firebase";
import { query, where } from "firebase/firestore";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const characterCollectionRef = collection(db, "characters");

class characterDataService {
  addcharacter = (newcharacter) => {
    return addDoc(characterCollectionRef, newcharacter);
  };

  updatecharacter = (id, updatedcharacter) => {
    const characterDoc = doc(db, "characters", id);
    return updateDoc(characterDoc, updatedcharacter);
  };

  deletecharacter = (id) => {
    const characterDoc = doc(db, "characters", id);
    return deleteDoc(characterDoc);
  };

  getAllcharacters = (projectId) => {
    const condition = query(
      characterCollectionRef,
      where("project_id", "==", projectId)
    );
    return getDocs(condition);
  };

  getSinglecharacter = (id) => {
    const characterDoc = doc(db, "characters", id);
    return getDoc(characterDoc);
  };
}

export default new characterDataService();
