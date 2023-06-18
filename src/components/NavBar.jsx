"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoLogoIonitron } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/slice/userSlice";
import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function NavBar() {
  // const user = "dsd";
  const [user, setUser] = useState(null);
  const router = useRouter();
  // const getUser = onAuthStateChanged(auth, (state) => {
  //   if (state?.email) {
  //     setUser(state?.displayName);
  //   }
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (state) => {
      if (state?.email) {
        setUser(state?.displayName);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup the subscription on unmount
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (err) {
      console.log("error while logging out", err);
    }
  };

  return (
    <div className="navbar">
      <div className="flex-1 items-center">
        <Link href="/" className="btn btn-ghost normal-case text-xl">
          <IoLogoIonitron size={30} />
          Plot<span className=" text-gray-400">Wizard</span>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1">
            <RxHamburgerMenu />
          </label>
          {user?.length ? (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-700  rounded-box w-52"
            >
              <li>
                <Link href="/login" className="text-white">
                  Profile
                </Link>
              </li>
              <button onClick={logout} className="btn">
                Logout
              </button>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-700  rounded-box w-52"
            >
              <li>
                <Link href="/login" className="text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-white">
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
