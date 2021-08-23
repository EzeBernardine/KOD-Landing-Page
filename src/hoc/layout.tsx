import { useContext, useEffect, useState } from "react";
import { Store } from "../state-management/storeComponent";
import { ContextCustomType } from "../interfaces";
import qs from "query-string";
import { useLocation, useHistory } from "react-router-dom";
import { actionTypes } from "../state-management/actions";
import { routeTo } from "../utils/network";
import { Spinner } from "kodobe-react-components";

export default function withLayout(AuthComponent: any) {
  const Wrapper = (props: any) => {
    const {
      state: { authInfo },
      dispatch,
    }: ContextCustomType = useContext(Store);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
      if (!authInfo) {
        const { token, clientId } = qs.parse(location.search);
        if (!token || !clientId) {
          if (dispatch) {
            dispatch({
              type: actionTypes.setAuthInfo,
              payload: { token, clientId },
            });
          }
        } else {
          routeTo("/logout", history);
        }
      }
      setLoading(false);
    }, []);

    if (loading) {
      return <Spinner />;
    }

    return <AuthComponent {...props} />;
  };

  return Wrapper;
}
