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

const plotCollectionRef = collection(db, "plot");

class plotDataService {
  addplot = (newplot) => {
    return addDoc(plotCollectionRef, newplot);
  };

  updateplot = (id, updatedplot) => {
    const plotDoc = doc(db, "plot", id);
    return updateDoc(plotDoc, updatedplot);
  };

  deleteplot = (id) => {
    const plotDoc = doc(db, "plot", id);
    return deleteDoc(plotDoc);
  };

  getAllplot = (projectId) => {
    const condition = query(
      plotCollectionRef,
      where("project_id", "==", projectId)
    );
    return getDocs(condition);
  };

  getSingleplot = (id) => {
    const plotDoc = doc(db, "plot", id);
    return getDoc(plotDoc);
  };
}

export default new plotDataService();
