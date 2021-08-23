import { Breadcrumb, Button } from "kodobe-react-components";
import { useHistory } from "react-router-dom";
import { routeTo } from "../utils/network";

import { useContext, useEffect } from "react";
import { actionTypes } from "../state-management/actions";
import { Store } from "../state-management/storeComponent";
import { getClientId, getLandingPages } from "../utils/network";

const LandingPages: React.FC = () => {
  const {
    dispatch,
    state: {
      //   baseUrls: { baseUrl },
    },
  }: any = useContext(Store);
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: actionTypes.setPageTile,
      payload: (
        <Breadcrumb
          onNavigate={(e) => routeTo(e, history)}
          items={[
            { title: "SETTINGS", link: "/settings" },
            { title: "LANDING PAGES", link: "" },
          ]}
        />
      ),
    });
  }, []);

  const getDefaultPages = async () => {
    const clientID = getClientId();
    // const result = await getLandingPages(clientID, 1, baseUrl);

    // if (result) {
    // }
  };

  useEffect(() => {
    getDefaultPages();
  }, [1]);

  const createPage = () => {
    routeTo("/landing-page/create-landing-page", history);
  };

  return (
    <div>
      Landing pages
      <div className="createButton">
        <Button onClick={createPage}>Create Landing Page</Button>
      </div>
    </div>
  );
};
export default LandingPages;
