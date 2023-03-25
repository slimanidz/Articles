import { Timestamp, collection, addDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
// import { auth} from "../pages/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "./FirebaseConfig";

const AddArticle = () => {
  const user = useAuthState(auth);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    username: user[0].displayName,
    createdAt: Timestamp.now().toDate(),
  });
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePublish = () => {
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill all the fields");
      return;
    }

    const storageRef = ref(
      storage,
      `/images/${Date.now()}${formData.image.name}`
    );

    const uploadImage = uploadBytesResumable(storageRef, formData.image);

    uploadImage.on(
      "state_changed",
      (snapshot) => {
        const progressPercent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progressPercent);
      },
      (err) => {
        console.log(err);
      },
      () => {
        setFormData({
          title: "",
          description: "",
          image: "",
        });

        getDownloadURL(uploadImage.snapshot.ref).then((url) => {
          const articleRef = collection(db, "Articles");
          addDoc(articleRef, {
            title: formData.title,
            description: formData.description,
            imageUrl: url,
            createdAt: Timestamp.now().toDate(),
            username: formData.username,
            // userId: user.uid,
            // likes: [],
            // comments: [],
          })
            .then(() => {
              alert("Article added successfully");
              setProgress(0);
            })
            .catch((err) => {
              alert("Error adding article");
            });
        });
      }
    );
  };

  return (
    <div className="border p-3 mt-3 bg-light flex flex-col">
      <>
        <h2>Create article</h2>
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            name="title"
            className="border"
            value={formData.title}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* description */}
        <div className="flex flex-col">
          <label htmlFor="">Description</label>
          <textarea
            name="description"
            className="border"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* image */}
        <label htmlFor="">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="form-control"
          onChange={(e) => handleImageChange(e)}
        />

        {progress === 0 ? null : (
          <div className="progress">
            <div
              className="progress-bar progress-bar-striped mt-2"
              style={{ width: `${progress}%` }}
            >
              {`uploading image ${progress}%`}
            </div>
          </div>
        )}
        <button
          className="bg-blue-500 active:bg-blue-300 text-white font-bold mt-2 p-1"
          onClick={handlePublish}
        >
          Publish
        </button>
      </>
    </div>
  );
};

export default AddArticle;
