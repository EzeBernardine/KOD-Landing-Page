import {
  Breadcrumb,
  Button,
  Spinner,
  Table,
  Alert,
} from "kodobe-react-components";
import { useHistory } from "react-router-dom";
import { routeTo } from "../utils/network";
import { GAMING_URL, LANDING_PAGE_URL } from "../utils/urls";
import { useContext, useEffect, useState } from "react";
import { actionTypes } from "../state-management/actions";
import { Store } from "../state-management/storeComponent";
import { errorHandler, axiosHandler } from "../utils/network";

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
  }, []);

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
        //   console.log(data);
        })
        .catch((e: any) => {
        //   console.log({ ...e });
          Alert.showError({ content: errorHandler(e) });
        });
      setLoading(false);
    };
    getDefaultPages();
  }, []);

  const createPage = () => {
    routeTo("/landing-page/create-landing-page", history);
  };

  const getLandingPages = () => {
    const result: any = [];

    for (let i of landingPages) {
      result.push([i.label, i.slug, i.createdAt]);
    }

    return result;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="tableQuestions">
          {landingPages.length ? (
            <Table
              headers={["Label", "Slug", "Date"]}
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
