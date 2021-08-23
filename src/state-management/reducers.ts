import { ObjectLiteral, ActionType } from "../interfaces";
import { actionTypes } from "./actions";

const reduceReducers =
  (...reducers: any) =>
  (prevState: any, value: any, ...args: any) =>
    reducers.reduce(
      (newState: any, reducer: any) => reducer(newState, value, ...args),
      prevState
    );

const authInfoData = {
  authInfo: null,
};

const authInfoReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;
  if (type === actionTypes.setAuthInfo) return { ...state, authInfo: payload };
  return state;
};

const pageTitleData = {
  pageTitle: null,
};

const pageTitleReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setPageTile) {
    return { ...state, pageTitle: payload };
  }
  return state;
};

const fetchedDataReducer = (state: ObjectLiteral, action: ActionType) => {
  const { type, payload } = action;

  if (type === actionTypes.setFetched) {
    return { ...state, getFetched: payload };
  }
  return state;
};

export const combinedReducers = reduceReducers(
  authInfoReducer,
  pageTitleReducer,
  fetchedDataReducer
);

export const initialState = {
  ...authInfoData,
  ...pageTitleData,
  getFetched: null,
};
