import React, {
  useState,
  createContext,
  PropsWithChildren,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type GlobalDataContextProps = {
  hasLaunched: boolean | null;
  setHasLaunched: Dispatch<SetStateAction<boolean | null>>;
};

const GlobalDataContext = createContext<GlobalDataContextProps>({
  hasLaunched: null,
  setHasLaunched: () => null,
});

const GlobalDataProvider = ({ children }: PropsWithChildren) => {
  const [hasLaunched, setHasLaunched] = useState<boolean | null>(false);

  return (
    <GlobalDataContext.Provider value={{ hasLaunched, setHasLaunched }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

const useGlobalData = () => {
  return useContext(GlobalDataContext);
};

export { useGlobalData, GlobalDataProvider };
