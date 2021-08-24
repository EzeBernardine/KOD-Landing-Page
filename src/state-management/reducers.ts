import { ObjectLiteral, ActionType } from "../interfaces";
import { actionTypes } from "./actions";
import { TemplateProps } from "kodobe-template-builder";
import { defaultTemplateData } from "../interfaces/landingPageDefaultData";

const reduceReducers =
  (...reducers: any) =>
  (prevState: any, value: any, ...args: any) =>
    reducers.reduce(
      (newState: any, reducer: any) => reducer(newState, value, ...args),
      prevState
    );

const clientInfoData = {
  clientInfo: null,
};

const clientInfoReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.updateClientInfo)
    return { ...state, clientInfo: payload };

  return state;
};

const authInfoData = {
  authInfo: null,
};

const authInfoReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;
  if (type === actionTypes.setAuthInfo) return { ...state, authInfo: payload };
  return state;
};

const clientCustomizationData = {
  clientCustomization: null,
};

const clientCustomizationReducer = (
  state: ObjectLiteral,
  action: ActionType
) => {
  const { type, payload } = action;

  if (type === actionTypes.updateClientPortalCustomization) {
    return { ...state, clientCustomization: payload };
  }

  return state;
};

const baseUrlData = {
  baseUrls: {},
};

const baseUrlReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setBaseUrls) {
    return { ...state, baseUrls: payload };
  }

  return state;
};

const activeDataTypeData = {
  activeDataType: {},
};

const activeDataTypeReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setActiveDataType) {
    return { ...state, activeDataType: payload };
  }

  return state;
};

const pageTitleData = {
  pageTitle: "",
};

const pageTitleReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setPageTile) {
    return { ...state, pageTitle: payload };
  }

  return state;
};

const isOnboardingData = {
  isOnboarding: false,
};

const isOnboardingReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.isOnboarding) {
    return { ...state, isOnboarding: payload };
  }

  return state;
};

const showLayoutData = {
  showLayout: true,
};

const showLayoutReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.showLayout) {
    return { ...state, showLayout: payload };
  }

  return state;
};

const boardLoadingData = {
  boardLoading: true,
};

const boardLoadingReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.boardLoading) {
    return { ...state, boardLoading: payload };
  }

  return state;
};

const showLogoData = {
  showLogo: false,
};

const showLogoReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.showLogo) {
    return { ...state, showLogo: payload };
  }

  return state;
};

const hideMainContentData = {
  hideMainContent: false,
};

const hideMainContentReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.hideMainContent) {
    return { ...state, hideMainContent: payload };
  }

  return state;
};

const clientPagesData = {
  clientPages: null,
};

const clientPageReducer = (state: ObjectLiteral[], action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setClientPages) {
    return { ...state, clientPages: payload };
  }

  return state;
};

interface TemplatePropsExtended extends TemplateProps {
  title: string;
  slug: string;
}

const landingPageDataHolder: { landingPageData: TemplatePropsExtended } = {
  landingPageData: { ...defaultTemplateData, title: "", slug: "" },
};

const landingPageReducer = (state: ObjectLiteral[], action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.updateLandingPageInfo) {
    return { ...state, landingPageData: payload };
  }

  return state;
};

export const combinedReducers = reduceReducers(
  clientInfoReducer,
  clientCustomizationReducer,
  baseUrlReducer,
  activeDataTypeReducer,
  pageTitleReducer,
  authInfoReducer,
  isOnboardingReducer,
  showLayoutReducer,
  boardLoadingReducer,
  showLogoReducer,
  hideMainContentReducer,
  clientPageReducer,
  landingPageReducer
);

export const initialState = {
  ...clientInfoData,
  ...authInfoData,
  ...clientCustomizationData,
  ...baseUrlData,
  ...activeDataTypeData,
  ...pageTitleData,
  ...isOnboardingData,
  ...showLayoutData,
  ...boardLoadingData,
  ...showLogoData,
  ...hideMainContentData,
  ...clientPagesData,
  ...landingPageDataHolder,
};
