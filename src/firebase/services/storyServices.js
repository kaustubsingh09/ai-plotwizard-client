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

const storyCollectionRef = collection(db, "generatedStories");

class storyDataService {
  addstory = (newstory) => {
    return addDoc(storyCollectionRef, newstory);
  };

  updatestory = (id, updatedstory) => {
    const storyDoc = doc(db, "generatedStories", id);
    return updateDoc(storyDoc, updatedstory);
  };

  deletestory = (id) => {
    const storyDoc = doc(db, "generatedStories", id);
    return deleteDoc(storyDoc);
  };

  getAllgeneratedStories = (projectId) => {
    const condition = query(
      storyCollectionRef,
      where("project_id", "==", projectId)
    );
    return getDocs(condition);
  };

  getSinglestory = (id) => {
    const storyDoc = doc(db, "generatedStories", id);
    return getDoc(storyDoc);
  };
}

export default new storyDataService();
