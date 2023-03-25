import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { toast } from "react-toastify";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "./FirebaseConfig";

export default function DeleteArticle({ id, imageUrl }) {
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await deleteDoc(doc(db, "Articles", id));
        toast("Article deleted successfully", { type: "success" });
        const storageRef = ref(storage, imageUrl);
        await deleteObject(storageRef);
      } catch (error) {
        toast("Error deleting article", { type: "error" });
        console.log(error);
      }
    }
  };
  return (
    <div>
      <i
        className="bg-red-700 p-2 rounded text-white cursor-pointer"
        onClick={handleDelete}
      >
        Delete
      </i>
    </div>
  );
}
