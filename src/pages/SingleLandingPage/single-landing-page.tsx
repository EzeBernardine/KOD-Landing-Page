import {
  Breadcrumb,
  Spinner,
  Alert,
} from "kodobe-react-components";
import { useHistory, useParams } from "react-router-dom";
import { routeTo } from "../../utils/network";
import { LANDING_PAGE_URL } from "../../utils/urls";
import { useContext, useEffect, useState } from "react";
import { actionTypes } from "../../state-management/actions";
import Tabs from "../../components/Tabs";
import { Store } from "../../state-management/storeComponent";
import { errorHandler, axiosHandler } from "../../utils/network";
import UpdateLandingPage from "../Edit-landing-page";
import Reports from "./reports";
import Details from "./details";
import Inputs from "./inputs";

const LandingPages: React.FC = () => {
  const [landingPages, setLandingPages]: any = useState({});
  const [loading, setLoading]: any = useState(true);
  const query: any = useParams();

  const {
    dispatch,
    state: { authInfo },
  }: any = useContext(Store);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: actionTypes.setPageTile,
      payload: (
        <Breadcrumb
          onNavigate={(e) => routeTo(e, history)}
          items={[
            { title: "LANDING PAGE", link: "/landing-page" },
            { title: "LANDING PAGES", link: "/landing-page/landing-pages" },
            { title: `${landingPages?.slug|| ''}`, link: "" },
          ]}
        />
      ),
    });
  }, [dispatch, history, landingPages?.slug]);

  useEffect(() => {
    const getDefaultPages = async () => {
      setLoading(true);
      await axiosHandler({
        method: "get",
        url: LANDING_PAGE_URL + `pages/${query?.pageId}`,
        clientID: authInfo?.clientId,
        token: authInfo?.token,
      })
        .then((res: any) => {
          let data = res.data.data;
          setLandingPages(data);
        })
        .catch((e: any) => {
          Alert.showError({ content: errorHandler(e) });
        });
      setLoading(false);
    };
    getDefaultPages();
  }, [authInfo, query?.pageId]);

  return (
    <div>
      <div className="spacer-20" />
      <div className="spacer-20" />

      <Tabs click={(tab: any) => console.log(tab)}>
        <div id="Details and Reports">
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Reports reports={landingPages?.reports || []} />
              <Details landingPage={landingPages} />
            </>
          )}
        </div>

        <div id="User Inputs">
            <Inputs pageId={query?.pageId} />
        </div>
        <div id="Update">
          <UpdateLandingPage />
        </div>
      </Tabs>
    </div>
  );
};
export default LandingPages;
