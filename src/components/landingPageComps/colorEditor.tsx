import { Divider } from "kodobe-react-components";
import React, { useContext, useEffect, useState } from "react";
import { actionTypes } from "../../state-management/actions";
import { Store } from "../../state-management/storeComponent";
import styles from "../../styles/styles.module.scss";
import { ColorPicker } from "../colorPicker";

export default function ColorEditor({ page }: any) {
  const {
    state: { landingPageData },
    dispatch,
  }: any = useContext(Store);

  const [colorInfo, setColorInfo]: any = useState("");

  useEffect(() => {
    if (landingPageData.uiFeatures.colorTheme) {
      setColorInfo(landingPageData.uiFeatures.colorTheme);
    }
}, [landingPageData.uiFeatures.colorTheme]);
// console.log(page, "page");

  useEffect(() => {
    if (page?.uiFeatures?.colorTheme) {
      setColorInfo(page?.uiFeatures?.colorTheme);
    }
  }, [page]);

  const onChange = (key: string, color: string) => {
    dispatch({
      type: actionTypes.updateLandingPageInfo,
      payload: {
        ...landingPageData,
        uiFeatures: {
          ...landingPageData.uiFeatures,
          colorTheme: {
            ...landingPageData.uiFeatures.colorTheme,
            [key]: color,
          },
        },
      },
    });
  };

  return (
    <div>
      <Divider className="dividerCustom" />
      <div className={styles.header}>
        <h3>Customize your Brand Theme</h3>
        {/* <p>You can choose up to 4 brand colour that sooth you</p> */}
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />
      <div className={`grid grid-auto-200 gap-1 ${styles.colorSelect}`}>
        <ColorPicker
          title="Main Color"
          value={colorInfo.mainColor}
          onChange={(e) => onChange("mainColor", e)}
        />
        <ColorPicker
          title="Content Color"
          value={colorInfo.contentColor}
          onChange={(e) => onChange("contentColor", e)}
        />
      </div>
    </div>
  );
}
