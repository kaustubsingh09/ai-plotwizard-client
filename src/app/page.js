"use client";
import Image from "next/image";
import LandingPage from "@/components/LandingPage";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const user = () =>
    onAuthStateChanged(auth, (state) => {
      if (state?.email) {
        router.push(`/${[state.displayName]}`);
      }
    });

  useEffect(() => {
    user();
  }, []);

  return (
    <>
      <LandingPage />
    </>
  );
}
