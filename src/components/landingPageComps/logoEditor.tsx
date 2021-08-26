import { Divider } from "kodobe-react-components";
import React, { useContext, useEffect, useState } from "react";
import { UploadCustom } from "../upload";
import styles from "../../styles/styles.module.scss";
import { Store } from "../../state-management/storeComponent";
import { actionTypes } from "../../state-management/actions";

export default function LogoEditor({ page }: any) {
  const [logo, setLogo] = useState("");
  const [Bglogo, setBgLogo] = useState("");
  //   const [gameGraphics, setGameGraphics] = useState("");

  const {
    state: { landingPageData },
    dispatch,
  }: any = useContext(Store);

  useEffect(() => {
    if (landingPageData.uiFeatures.logo) {
      setLogo(landingPageData.uiFeatures.logo);
    }
    if (landingPageData.uiFeatures.backgroundImage) {
      setBgLogo(landingPageData.uiFeatures.backgroundImage);
    }
  }, [landingPageData]);

  useEffect(() => {
    if (page?.uiFeatures?.logo || page?.uiFeatures?.backgroundImage) {
      dispatch({
        type: actionTypes.updateLandingPageInfo,
        payload: {
          ...landingPageData,
          uiFeatures: {
            ...landingPageData.uiFeatures,
            ...(page?.uiFeatures?.logo && {backgroundImage: page?.uiFeatures?.logo}),
            ...(page?.uiFeatures?.backgroundImage && {backgroundImage: page?.uiFeatures?.backgroundImage})
          },
        },

      });
    }

   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, dispatch]);

  const onChange = (e: any) => {
    if (e.completed) {
      dispatch({
        type: actionTypes.updateLandingPageInfo,
        payload: {
          ...landingPageData,
          uiFeatures: {
            ...landingPageData.uiFeatures,
            logo: e.responseFromServer.data.url,
          },
        },
      });
    }
  };

  const onBgChange = (e: any) => {
    if (e.completed) {
      dispatch({
        type: actionTypes.updateLandingPageInfo,
        payload: {
          ...landingPageData,
          uiFeatures: {
            ...landingPageData.uiFeatures,
            backgroundImage: e.responseFromServer.data.url,
          },
        },
      });
    }
  };

  //   const onGraphicsChange = (e: any) => {
  //     if (e.completed) {
  //       dispatch({
  //         type: actionTypes.updateLandingPageInfo,
  //         payload: {
  //           ...landingPageData,
  //           uiFeatures: {
  //             ...landingPageData.uiFeatures,
  //             gameGraphics: e.responseFromServer.data.url,
  //           },
  //         },
  //       });
  //     }
  //   };

  return (
    <div>
      <Divider className="dividerCustom" />
      <div className={styles.header}>
        <h3>Upload Logo</h3>
        <p>
          Choose your company logo, this would be displayed on the side menu
        </p>
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />
      <div className={styles.uploadGrid}>
        <UploadCustom
          onChange={onChange}
          mainText={logo ? "change logo" : "Choose a file to Upload"}
        />
        {logo !== "" && (
          <div
            className={styles.imageCover}
            style={{ backgroundImage: `url(${logo})` }}
          />
        )}
      </div>
      <Divider className="dividerCustom" />
      <div className={styles.header}>
        <h3>Upload Background Image</h3>
        <p>
          Choose your company logo, this would be displayed on the side menu
        </p>
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />
      <div className={styles.uploadGrid}>
        <UploadCustom
          onChange={onBgChange}
          mainText={Bglogo ? "change BgImage" : "Choose a file to Upload"}
        />
        {Bglogo !== "" && (
          <div
            className={styles.imageCover}
            style={{ backgroundImage: `url(${Bglogo})` }}
          />
        )}
      </div>
      {/* <Divider className="dividerCustom" /> */}
      {/* <div className={styles.header}>
        <h3>Upload Game Graphics</h3>
        <p>
          Choose your company logo, this would be displayed on the side menu
        </p>
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />
      <div className={styles.uploadGrid}>
        <UploadCustom
          onChange={onGraphicsChange}
          mainText={
            gameGraphics ? "change gameGraphics" : "Choose a file to Upload"
          }
        />
        {gameGraphics !== "" && (
          <div
            className={styles.imageCover}
            style={{ backgroundImage: `url(${gameGraphics})` }}
          />
        )}
      </div> */}
    </div>
  );
}
