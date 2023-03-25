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

  const setNounouIdC1 = useCallback((id) => {
    setArticleId(id);
  }, []);

  return (
    <AppContext.Provider
      {...props}
      value={{
        setNounouIdC1,
        id,
      }}
    />
  );
};
export default AppContextProvider;
