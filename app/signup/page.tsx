"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = React.useState(false);
  const btnDisabled =
    user.email.length === 0 ||
    user.username.length === 0 ||
    user.password.length === 0;

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Signup failed";
      console.log("Signup failed", message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur">
        <h1 className="text-center text-4xl font-bold text-white">
          {loading ? "Processing" : "Signup"}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-400">
          Create your account to continue
        </p>

        <div className="mt-8 flex flex-col gap-4">
          <label
            htmlFor="username"
            className="text-sm font-medium text-slate-200"
          >
            Username
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            id="username"
            value={user.username}
            type="text"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Enter your username"
          />

          <label htmlFor="email" className="text-sm font-medium text-slate-200">
            Email
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            id="email"
            value={user.email}
            type="email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Enter your email"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-200"
          >
            Password
          </label>
          <input
            className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
            id="password"
            value={user.password}
            type="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Create a password"
          />

          <button
            onClick={onSignup}
            disabled={loading || btnDisabled}
            className="mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {btnDisabled ? "No signup" : "Signup"}
          </button>

          <Link
            href="/login"
            className="text-center text-sm text-cyan-300 hover:text-cyan-200"
          >
            Go to Login page
          </Link>
        </div>
      </div>
    </div>
  );
}
