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

const projectCollectionRef = collection(db, "projects");

class ProjectDataService {
  addProject = (newProject) => {
    return addDoc(projectCollectionRef, newProject);
  };

  updateProject = (id, updatedProject) => {
    const projectDoc = doc(db, "projects", id);
    return updateDoc(projectDoc, updatedProject);
  };

  deleteProject = (id) => {
    const projectDoc = doc(db, "projects", id);
    return deleteDoc(projectDoc);
  };

  getAllProjects = (userUid) => {
    const condition = query(
      projectCollectionRef,
      where("user_id", "==", userUid)
    );
    return getDocs(condition);
  };

  getSingleProject = (id) => {
    const projectDoc = doc(db, "projects", id);
    return getDoc(projectDoc);
  };
}

export default new ProjectDataService();
