"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter()
  const logout = async() => {
    try {
        await axios.get("/api/users/Logout")
        toast.success("Logout Successful")
        router.push("/login")
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Logout failed";
        console.log(message)
        toast.error(message)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-4xl">Profile</h1>
      <hr />
      <p>Welcome to your profile page!</p>
      <button
        onClick={logout}
        className="px-6 py-2.5 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Log Out
      </button>
    </div>
  );
}
