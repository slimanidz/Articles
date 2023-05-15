import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
// import { useParams } from "react-router-dom";
import { useAppContext } from "../components/AppContext";
import Header from "../components/Header";
import { auth, db } from "../components/FirebaseConfig";
import formatLongDateTime from "../components/Formateurs/FormatDate";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import LikeArticle from "../components/LikeArticle";

const Article = () => {
  // const { id } = useParams();
  const { id } = useAppContext();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id]);
  return (
    <div>
      <Header />

      {/* <p>id:{id}</p> */}
      {article ? (
        <div className="flex flex-col gap-5 items-center justify-center">
          <div className="w-full flex justify-between p-3 ">
            <p>Created by: {article.username}</p>
            <p>
              Created at:
              {formatLongDateTime(new Date(article.createdAt.toDate()))}
            </p>
          </div>

          <h1 className="text-4xl font-bold">{article.title}</h1>
          <Image
            src={`${article.imageUrl}`}
            alt="title"
            width={500}
            height={500}
          />
          {/* indent-20 */}
          <p
            className="w-[75%] text-xl text-justify first-letter:text-7xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left"
          >
            {article.description}
          </p>
          <div className="w-full flex justify-end p-5 text-xl">
            <LikeArticle id={id} likes={article.likes} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Article;
