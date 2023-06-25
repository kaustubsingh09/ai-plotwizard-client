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

const settingCollectionRef = collection(db, "settings");

class settingDataService {
  addsetting = (newsetting) => {
    return addDoc(settingCollectionRef, newsetting);
  };

  updatesetting = (id, updatedsetting) => {
    const settingDoc = doc(db, "settings", id);
    return updateDoc(settingDoc, updatedsetting);
  };

  deletesetting = (id) => {
    const settingDoc = doc(db, "settings", id);
    return deleteDoc(settingDoc);
  };

  getAllsettings = (projectId) => {
    const condition = query(
      settingCollectionRef,
      where("project_id", "==", projectId)
    );
    return getDocs(condition);
  };

  getSinglesetting = (id) => {
    const settingDoc = doc(db, "settings", id);
    return getDoc(settingDoc);
  };
}

export default new settingDataService();
