import { db } from "../firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");

class UserDataService {
  addUser = async (newUser) => {
    const { email } = newUser;

    const getCollectionToCheck = await getDocs(userCollectionRef);
    const exsistingUser = getCollectionToCheck.docs.find(
      (doc) => doc.data().email === email
    );

    if (exsistingUser) {
      return;
    }
    return addDoc(userCollectionRef, newUser);
  };
}

export default new UserDataService();
