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

  const setIdFunction = useCallback((id) => {
    setArticleId(id);
  }, []);

  return (
    <AppContext.Provider
      {...props}
      value={{
        setIdFunction,
        id,
        setUser,
        user,
      }}
    />
  );
};
export default AppContextProvider;
