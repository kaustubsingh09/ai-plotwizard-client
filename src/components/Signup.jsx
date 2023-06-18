"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export default function Signup() {
  const provider = new GoogleAuthProvider();

  const router = useRouter();

  const user = onAuthStateChanged(auth, (state) => {
    if (state?.email) {
      router.push(`/${[state?.displayName]}`);
    }
  });

  useEffect(() => {
    user();
  }, [auth]);

  const signinGoogle = async () => {
    const res = await signInWithRedirect(auth, provider);
    const name = res.user?.displayName;
    console.log(name);
    router.push(`/${[name]}`);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const companyName = "Plot Wizard";

  return (
    <div className="flex flex-wrap justify-center mt-15 p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-gray-100 text-5xl sm:text-5xl">
          Create new account .
        </h1>
        <div className="flex flex-row gap-2">
          Already a member?
          <div className="flex text-blue-500">
            <Link href="/login"> Login</Link>
          </div>
        </div>
        <div className="mt-5">
          <form className="flex gap-5 flex-col">
            <div className="flex flex-row w-full max-w-xs gap-3">
              <input
                type="text"
                placeholder="name"
                className="input w-1/2  bg-gray-700"
              />
              <input
                type="text"
                placeholder="last name"
                className="input w-1/2  bg-gray-700"
              />
            </div>
            <input
              type="text"
              placeholder="email"
              className="input w-full max-w-xs bg-gray-700"
            />
            <input
              type="password"
              placeholder="password"
              className="input w-full max-w-xs bg-gray-700"
            />
            <button className="btn w-full max-w-xs">Login</button>
          </form>
          <input
            type="text"
            placeholder="Forgot password"
            className=" text-center input input-bordered w-full max-w-xs mt-2"
            disabled
          />
        </div>
        {/* <span className="text-center text-xl font-semibold">or</span> */}
        <button onClick={signinGoogle} className="btn w-full max-w-xs bg-black">
          <div className="flex flex-row items-center gap-3">
            <FcGoogle size={30} />
            <span>Sign Up with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
}
