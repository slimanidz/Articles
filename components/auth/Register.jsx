import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../FirebaseConfig";
import Header from "../Header";
import { useRouter } from "next/router";
import { useAppContext } from "../AppContext";

export default function Register() {
  const Router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, { displayName: name });
      signOut(auth);
      Router.push("/");
      alert("account created successfully, you can login now.");
    } catch (error) {
      alert("Oooops error");
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" grow  flex flex-col items-center justify-center gap-5 m-5 bg-red-20 ">
        <h1 className="text-2xl font-bold">Cree un compte</h1>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            className="border"
            placeholder="Enter your name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
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
          className="bg-blue-500 active:bg-blue-300 p-2 rounded text-white font-bold"
          onClick={handleSignup}
        >
          Register
        </button>
      </div>
    </div>
  );
}
