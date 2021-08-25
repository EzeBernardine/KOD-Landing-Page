import TemplateBuilder from "kodobe-template-builder";
import { useContext } from "react";
import { Store } from "../state-management/storeComponent";

export const LandingPagePreview: React.FC = () => {
  const {
    state: { landingPageData },
  }: any = useContext(Store);
//   console.log(landingPageData, "landingPageData");
  return <TemplateBuilder {...landingPageData} />;
};
