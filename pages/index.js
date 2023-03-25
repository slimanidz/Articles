import AddArticle from "../components/AddArticle";
import Articles from "../components/Articles";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Header from "../components/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../pages/firebaseConfig";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <div className="">
        <Header />
      </div>

      <div className="flex justify-between m-5 ">
        <Articles />
        <div className="flex flex-col gap-3">
          {user ? <AddArticle /> : <Login />}
        </div>
      </div>
    </div>
  );
}
