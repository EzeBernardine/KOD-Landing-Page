import { useContext, useEffect } from "react";
import { ContextCustomType } from "./interfaces";
import Router from "./router";
import { actionTypes } from "./state-management/actions";
import StoreComponent, { Store } from "./state-management/storeComponent";
import { routeTo } from "./utils/network";
import qs from "query-string";

function App() {
  return (
    <StoreComponent initialData={{}}>
      <MainLayout />
    </StoreComponent>
  );
}

export default App;

const MainLayout = () => {
  const {
    state: { pageTitle, authInfo },
    dispatch,
  }: ContextCustomType = useContext(Store);

  useEffect(() => {
    if (!authInfo && window.location.pathname !== "/logout") {
      const { token, clientId } = qs.parse(window.location.search);
      if (token && clientId) {
        window.history.replaceState(null, "", window.location.pathname);
        if (dispatch) {
          dispatch({
            type: actionTypes.setAuthInfo,
            payload: { token, clientId },
          });
        }
      } else {
        routeTo("/logout");
      }
    }
  }, [authInfo, dispatch]);

  return (
    <div className="mainLayout">
      <div className="pageTitle">{pageTitle}</div>
      <Router />
    </div>
  );
};
