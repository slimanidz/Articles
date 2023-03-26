import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "./FirebaseConfig";
import { useAppContext } from "./AppContext";
import DeleteArticle from "./DeleteArticle";
import formatLongDateTime from "./Formateurs/FormatDate";

const Articles = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const { setNounouIdC1 } = useAppContext();
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
    setNounouIdC1(id);
    router.push("/article");
  };

  return (
    <>
      <div className="flex flex-wrap gap-5">
        {articles.map(
          ({ id, title, description, imageUrl, createdAt, username }) => (
            <div key={id} className="  bg-red-20 w-64">
              <div className="">
                <h1 className="text-xl font-bold">{title}</h1>
                <div className="flex justify-between">
                  <p>Pub by: {username}</p>
                  <p> {formatLongDateTime(new Date(createdAt.toDate()))}</p>
                </div>

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
                </button>
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

      {/* <div>
        {articles.length === 0 ? (
          <p>No articles found!</p>
        ) : (
          articles.map(
            ({ id, title, description, imageUrl, createdAt, createdBy }) => (
              <div className="border mt-3 p-3 bg-light" key={id}>
                <div className="row">
                  <div className="col-3">
                    <Link to={`/article/${id}`}>
                      <img
                        src={imageUrl}
                        alt="title"
                        style={{ height: 180, width: 180 }}
                      />
                    </Link>
                  </div>
                  <div className="col-9 ps-3">
                    <div className="row">
                      <div className="col-6">
                        {createdBy && (
                          <span className="badge bg-primary">{createdBy}</span>
                        )}
                      </div>
                    </div>
                    <h3>{title}</h3>
                    <p>{createdAt.toDate().toDateString()}</p>
                    <h5>{description}</h5>
                  </div>
                </div>
              </div>
            )
          )
        )}
      </div> */}
    </>
  );
};

export default Articles;
