import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "./FirebaseConfig";
import { useAppContext } from "./AppContext";
import DeleteArticle from "./DeleteArticle";
import formatLongDateTime from "./Formateurs/FormatDate";
import { AiFillHeart } from "react-icons/ai";

const Articles = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const { setIdFunction } = useAppContext();
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  }, []);

  const handleClick = (event) => {
    const id = String(event.currentTarget.getAttribute("data-id"));
    setIdFunction(id);
    router.push("/article");
  };

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {articles.map(
          ({
            id,
            title,
            description,
            imageUrl,
            createdAt,
            username,
            likes,
          }) => (
            <div key={id} className="  bg-red-20 w-64">
              <div className="">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="flex justify-between">
                  <p>Pub by: {username}</p>
                  <p> {formatLongDateTime(new Date(createdAt.toDate()))}</p>
                </div>

                <div className="flex justify-between items-end">
                  <button
                    onClick={handleClick}
                    className="flex justify-center"
                    data-id={id}
                  >
                    <Image
                      src={`${imageUrl}`}
                      alt="title"
                      width={180}
                      height={180}
                    />
                  </button>{" "}
                  <p className="flex gap-2 items-center">
                    {user ? (
                      <AiFillHeart
                        className={
                          likes?.includes(user.uid) ? "text-red-500" : ""
                        }
                      />
                    ) : (
                      <AiFillHeart />
                    )}
                    <span>{likes.length}</span>
                  </p>
                </div>
              </div>

              <p className="truncate">{description}</p>
              <div className="mt-2">
                {user && user.displayName === username ? (
                  <DeleteArticle id={id} imageUrl={imageUrl} />
                ) : null}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Articles;
