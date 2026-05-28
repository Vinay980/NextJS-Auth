"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Profile() {
  const [data, setData] = useState("Nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/Logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-4xl">Profile</h1>
      <hr />
      <p>Welcome to your profile page!</p>
      <h2 className="my-6 text-2xl font-semibold text-gray-800">
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className="my-4 px-6 py-2.5 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Log Out
      </button>
      <button
        onClick={getUserDetails}
        className="my-4 px-6 py-2.5 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg transition-all duration-300 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Get User Details
      </button>
    </div>
  );
}
