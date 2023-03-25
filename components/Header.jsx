import { signOut } from "firebase/auth";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./FirebaseConfig";
import { AiOutlineHome } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
const Header = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <div className="flex justify-between items-center p-2  bg-slate-200">
      <Link href="/" className="flex">
        <AiOutlineHome className="w-10 h-10" />
      </Link>
      {user ? (
        <div className="flex items-center gap-3">
          <h1>
            {" "}
            Hello: <span className="font-bold">{user.displayName}</span>
          </h1>
          <button
            onClick={() => {
              signOut(auth);
            }}
          >
            <VscSignOut className="w-10 h-10" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
