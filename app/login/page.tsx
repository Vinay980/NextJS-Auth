"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Signup() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);
  const buttonDisabled = user.email.length === 0 || user.password.length === 0;

  const onLogin = async () => {
    try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Login failed";
            console.log("Login failed", message);
            toast.error(message);
        } finally{
        setLoading(false);
        }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="font-bold text-4xl">Login</h1>
      <hr />
      <label htmlFor="email">email</label>
      <input
        className="w-full max-w-sm rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
        id="email"
        value={user.email}
        type="text"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label htmlFor="password">password</label>
      <input
        className="w-full max-w-sm rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-900 shadow-sm transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-100"
        id="password"
        value={user.password}
        type="text"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={onLogin}
        disabled={loading || buttonDisabled}
        className="mt-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-200 hover:from-cyan-600 hover:to-blue-700 hover:shadow-xl active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-cyan-200"
      >
        Login Here
      </button>
      <Link href="/signup">Go to Signup page</Link>
    </div>
  );
}
