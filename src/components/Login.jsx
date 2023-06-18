"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithRedirect,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  const companyName = "Plot Wizard";
  const router = useRouter();
  const provider = new GoogleAuthProvider();

  //have to changed
  const user = onAuthStateChanged(auth, (state) => {
    if (state?.email) {
      router.push(`/${[state.displayName]}`);
    }
  });

  const signinGoogle = async () => {
    const res = await signInWithRedirect(auth, provider);
  };

  return (
    <div className="flex flex-wrap justify-center mt-15 p-10">
      <div className="flex flex-col gap-3">
        <h1 className="font-bold text-gray-100 text-5xl sm:text-5xl">
          Welcome back .
        </h1>
        <div className="flex flex-row gap-2">
          Not a member?
          <div className="flex text-blue-500">
            <Link href="/signup"> Sign Up</Link>
          </div>
        </div>
        <div className="mt-5">
          <form className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="email"
              className="input w-full max-w-xs bg-gray-700"
            />
            <input
              type="text"
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
            <span>Login with Google</span>
          </div>
        </button>
      </div>
    </div>
  );
}
