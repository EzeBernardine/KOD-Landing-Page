import {
  Breadcrumb,
  Button,
  Spinner,
  Table,
  Alert,
} from "kodobe-react-components";
import { useHistory } from "react-router-dom";
import { routeTo } from "../utils/network";
import { LANDING_PAGE_URL } from "../utils/urls";
import { useContext, useEffect, useState } from "react";
import { actionTypes } from "../state-management/actions";
import { Store } from "../state-management/storeComponent";
import { errorHandler, axiosHandler } from "../utils/network";
import { GetDate } from "../utils/factory";

const LandingPages: React.FC = () => {
  const [landingPages, setLandingPages]: any = useState({});
  const [loading, setLoading]: any = useState(true);

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
            { title: "LANDING PAGES", link: "" },
          ]}
        />
      ),
    });
  }, [dispatch, history]);

  useEffect(() => {
    const getDefaultPages = async () => {
      setLoading(true);
      await axiosHandler({
        method: "get",
        url: LANDING_PAGE_URL + "pages",
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
  }, [authInfo]);

  const createPage = () => {
    routeTo("/landing-page/create-landing-page", history);
  };

  const editLangingPage = (pageId: string) => {
    routeTo(`/landing-page/edit-landing-page/${pageId}`, history);
  };

  const getLandingPages = () => {
    const result: any = [];

    for (let i of landingPages) {
      result.push([
        i.title,
        i.slug,
        GetDate(i.createdAt),
        <div
          className="linkColor pointer"
          onClick={() => editLangingPage(i.pageId)}
        >
          Update
        </div>,
      ]);
    }

    return result;
  };

  return (
    <div>
      <div className="spacer-20" />
      <div className="spacer-20" />

      {loading ? (
        <Spinner />
      ) : (
        <div className="tableQuestions">
          {landingPages.length ? (
            <Table
              headers={["Title", "Slug", "Date", "Action"]}
              data={loading ? [] : getLandingPages()}
            />
          ) : (
            <span>No data found!</span>
          )}
        </div>
      )}

      <div className="createButton">
        <Button onClick={createPage}>Create Landing Page</Button>
      </div>
    </div>
  );
};
export default LandingPages;
