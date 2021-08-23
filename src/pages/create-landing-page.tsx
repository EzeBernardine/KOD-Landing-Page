import { Button, Icon, IconTypes } from "kodobe-react-components";
import { useHistory } from "react-router-dom";
import { routeTo } from "../utils/network";
import styles from "../styles/styles.module.scss";
import LogoEditor from "../components/landingPageComps/logoEditor";
import ColorEditor from "../components/landingPageComps/colorEditor";
import { useContext, useEffect, useState } from "react";
import { Store } from "../state-management/storeComponent";
import { actionTypes } from "../state-management/actions";
import { colors } from "../interfaces/data";
import { LandingPagePreview } from "../components/landingPagePreview";
import InputsDefinition from "../components/landingPageComps/inputsDefinition";

const CreateLandingPage = () => {
  const [loading] = useState(false);
  const history = useHistory();

  const {
    state: {
      landingPageData,
      isOnboarding,
    },
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
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // setLoading(true);
    delete landingPageData.gameEndProps.status;
    delete landingPageData.gameEndProps.playData;
    delete landingPageData.gameEndProps.colorTheme;
    delete landingPageData.gameProps.clientInfo.logo;
    delete landingPageData.gameProps.clientInfo.userId;
    console.log({ landingPageData });

  
  };

  const goBack = () => {
    routeTo("/settings", history);
  };

  return (
    <div>
      <div className={styles.customize}>
        <div className={styles.left}>
          {!isOnboarding && (
            <div className="flex justify-end">
              <div className="flex align-center pointer" onClick={goBack}>
                <Icon
                  iconType={IconTypes.ChevronLeft}
                  color={colors.linkColor}
                />
                <div className="linkColor">Go Back</div>
              </div>
            </div>
          )}
          <div className="spacer-20" />
          <div className={styles.header}>
            <h2>Setup your Landing Page</h2>
            <p>
              You can use this option to make the portal truly yours by
              importing your logo, colours and fonts
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <LogoEditor />
            <ColorEditor />
            <InputsDefinition />

            <div className="spacer-50" />
            <Button
              className="successColorBg"
              type="submit"
              disabled={loading}
              loading={loading}
            >
              Create Landing Page
            </Button>
          </form>
          <div className="spacer-20" />
        </div>
        {/* <div className={styles.right}>
          <br />
          <h1>Preview Landing Page</h1>
          <br />
          <LandingPagePreview />
          <br />
          <br />
        </div> */}
      </div>
    </div>
  );
};

export default CreateLandingPage;
