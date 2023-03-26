import AddArticle from "../components/AddArticle";
import Articles from "../components/Articles";
import Login from "../components/auth/Login";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../components/FirebaseConfig";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="">
        <Header />
      </div>

      <div className="md:flex md:flex-row-reverse md:justify-between gap-5 m-5 ">
        <div className="flex flex-col  gap-3 m-5">
          {user ? <AddArticle /> : <Login />}
        </div>
        <div className=" ">
          <Articles />
        </div>
      </div>
    </div>
  );
}
