import { Button,  Alert, Spinner } from "kodobe-react-components";
import {  useParams, useHistory } from "react-router-dom";
import { routeTo, axiosHandler, errorHandler } from "../utils/network";
import styles from "../styles/styles.module.scss";
import LogoEditor from "../components/landingPageComps/logoEditor";
import ColorEditor from "../components/landingPageComps/colorEditor";
import { useContext, useEffect, useState } from "react";
import { Store } from "../state-management/storeComponent";
import { actionTypes } from "../state-management/actions";
import { LandingPagePreview } from "../components/landingPagePreview";
import InputsDefinition from "../components/landingPageComps/inputsDefinition";
import { LANDING_PAGE_URL } from "../utils/urls";

const CreateLandingPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState({});
  const query: any = useParams();
const history = useHistory();


  const {
    state: { landingPageData, isOnboarding, authInfo },
    dispatch,
  }: any = useContext(Store);

  useEffect(() => {
    dispatch({ type: actionTypes.showLayout, payload: false });
    dispatch({ type: actionTypes.showLogo, payload: true });
    return () => {
      if (!isOnboarding) {
        dispatch({ type: actionTypes.showLayout, payload: true });
        dispatch({ type: actionTypes.showLogo, payload: false });
      }
    };
  }, [dispatch, isOnboarding]);

  useEffect(() => {
    const getLandingPage = async () => {
      setLoading(true);
      await axiosHandler({
        method: "get",
        url: LANDING_PAGE_URL + `pages/${query?.pageId}`,
        clientID: authInfo?.clientId,
        token: authInfo?.token,
      })
        .then((res: any) => {
          let data = res.data.data;
          setPage(data);
          console.log(data);
        })
        .catch((e: any) => Alert.showError({ content: errorHandler(e) }));
      setLoading(false);
    };
    getLandingPage();
  }, [authInfo, query?.pageId]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await axiosHandler({
      method: "patch",
      url: `${LANDING_PAGE_URL}pages/${query?.pageId}`,
      data: { ...landingPageData },
      clientID: authInfo?.clientId,
    }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
    if (res) {
      console.log(res);
      Alert.showSuccess({ content: "Landing Page Created Successfully" });
      routeTo("/landing-page", history);
    }
    setLoading(false);
  };

  
  return (
    <div>
      {loading ? (
        <Spinner />
      ) : Object.keys(page).length ? (
        <div className={styles.customize}>
          <div className={styles.left}>
            <div className="spacer-20" />
            <div className={styles.header}>
              <h2>Setup your Landing Page</h2>
              <p>
                You can use this option to make the portal truly yours by
                importing your logo, colours and fonts
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <LogoEditor page={page} />
              <ColorEditor page={page} />
              <InputsDefinition page={page} />

              <div className="spacer-50" />
              <Button
                className="successColorBg"
                type="submit"
                disabled={loading}
                loading={loading}
              >
                Update Landing Page
              </Button>
            </form>

            <div className="spacer-20" />
          </div>
          <div className={styles.right}>
            <br />
            <h1>Preview Landing Page</h1>
            <br />
            <LandingPagePreview />
            <br />
            <br />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CreateLandingPage;
