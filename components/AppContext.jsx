import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = (props) => {
  const [id, setArticleId] = useState("");
  const [user, setUser] = useState("");
  console.log(user);

  const setNounouIdC1 = useCallback((id) => {
    setArticleId(id);
  }, []);

  return (
    <AppContext.Provider
      {...props}
      value={{
        setNounouIdC1,
        id,
        setUser,
        user,
      }}
    />
  );
};
export default AppContextProvider;
