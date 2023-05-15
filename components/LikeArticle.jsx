import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./FirebaseConfig";
import { AiFillHeart } from "react-icons/ai";

export default function LikeArticle({ id, likes }) {
  const [user] = useAuthState(auth);

  const likesRef = doc(db, "Articles", id);

  const handleLike = () => {
    if (likes?.includes(user.uid)) {
      updateDoc(likesRef, {
        likes: arrayRemove(user.uid),
      })
        .then(() => {
          console.log("unliked");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      updateDoc(likesRef, {
        likes: arrayUnion(user.uid),
      })
        .then(() => {
          console.log("liked");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleAlert = () => {
    alert("If you want to like it, you must be connected");
  };
  return (
    <div className="flex items-center gap-2">
      <p>{likes.length}</p>

      {user ? (
        <button onClick={handleLike}>
          <AiFillHeart
            className={likes?.includes(user.uid) ? "text-red-500" : ""}
          />
        </button>
      ) : (
        <button onClick={handleAlert}>
          <AiFillHeart />
        </button>
      )}
    </div>
  );
}
