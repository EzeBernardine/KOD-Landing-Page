import { createContext, ReactNode, useReducer, useContext } from "react";
import { combinedReducers, initialState } from "./reducers";
import { ContextCustomType } from "../interfaces/index";

const Store = createContext({});

type Props = {
  children?: ReactNode;
  initialData?: any;
};

const StoreComponent = ({ children, initialData = {} }: Props) => {
  const [state, dispatch] = useReducer(combinedReducers, {
    ...initialState,
    ...initialData,
  });

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export const StoreContext = () => {
  const {
    state: { authInfo },
  }: ContextCustomType = useContext(Store);
  if (!authInfo) {
    throw new Error("StoreContext should be used inside the context provider");
  }
  return authInfo;
};
export { Store };
export default StoreComponent;