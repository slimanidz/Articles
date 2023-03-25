import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db, storage } from "../FirebaseConfig";

export default function Login() {
  // let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // navigate("/");
    } catch (error) {
      // toast(error.code, { type: "error" });
      alert("Oooooops ERROR");
    }
  };
  return (
    <div className="border p-3 ">
      <h1 className="text-3xl font-bold text-center">Login</h1>
      <div className="p-3 text-center">
        <Link href="/sign-in" className="text-center bg-slate-200 p-1 rounded">
          cree un compte
        </Link>
      </div>

      <div className="flex flex-col">
        <label>Email</label>
        <input
          type="email"
          className="border"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>

      <div className="flex flex-col">
        <label>Password</label>
        <input
          type="password"
          className="border"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <button
        className="w-full bg-blue-500 active:bg-blue-300 text-white font-bold"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
