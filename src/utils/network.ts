

import { tokenStore } from "./../interfaces/data";
import { ObjectLiteral } from "./../interfaces/index";
import Axios from "axios";
import { CLIENT_PAGE_URL, LANDING_PAGE_URL } from "./urls";
import { Alert } from "kodobe-react-components";

type AxiosProps = {
  method: string;
  url: string;
  token?: string;
  clientID?: string;
  data?: ObjectLiteral;
  extra?: any;
};

export const axiosHandler = ({
  method = "",
  url = "",
  token = "",
  clientID = "",
  data = {},
  extra = null,
}: AxiosProps): any => {
  let methodType = method.toUpperCase();
  if (["GET", "POST", "PATCH", "PUT", "DELETE"].includes(methodType)) {
    let axiosProps: any = { method: methodType, url, data };

    if (token !== "") {
      axiosProps.headers = { Authorization: `Bearer ${token}` };
    }
    if (clientID !== "") {
      axiosProps.headers = { ...axiosProps.headers, "client-id": clientID };
    }
    if (extra) {
      axiosProps.headers = { ...axiosProps.headers, ...extra };
    }
    axiosProps.headers = {
      ...axiosProps.headers,
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    };

    return Axios(axiosProps);
  } else {
    alert(`method ${methodType} is not accepted or data is not an object`);
  }
};

export const routeTo = (link: string, history?: any) => {
    if (!history) {
      window.location.href = link;
    } else {
      history.push(link);
    }
    // eslint-disable-next-line no-restricted-globals
    parent.postMessage(link, "*");
  };

export const errorHandler = (err: ObjectLiteral, defaulted = false) => {
  if (defaulted) {
    return "Ops!, an error occurred.";
  }

  let messageString = "";
  if (!err.response) {
    messageString += "Network error! check your network and try again";
  } else {
    let data = err.response.data.results;
    if (!err.response.data.results) {
      data = err.response.data;
    }
    messageString = loopObj(data);
  }
  return messageString.replace(/{|}|'|\[|\]/g, "");
};

const loopObj = (obj: ObjectLiteral) => {
  let agg = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      agg += `<div>${key}: ${
        typeof obj[key] === "object" ? loopObj(obj[key]) : obj[key]
      }</div>`;
    }
  }
  return agg;
};

export const redirectToLogin = (AUTH_URL: string) => {
  window.location.href =
    AUTH_URL +
    `?redirect=${window.location.host}&extra=${window.location.pathname}`;
};

const getAuthData = (v = "token") => {
  try {
    let l: any = localStorage.getItem(tokenStore);

    if (!l) return null;
    l = JSON.parse(l);
    return l[v];
  } catch (e) {
    return "";
  }
};

export const getToken = () => {
  return getAuthData();
};

export const getClientId = () => {
  return getAuthData("clientId");
};

export const logout = (AUTH_URL: string) => {
  localStorage.removeItem(tokenStore);

  redirectToLogin(AUTH_URL);
};

export function shadeColor(color: string, amount: number) {
  const value = (amount * 220) / 100;

  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + value)).toString(16)
        ).substr(-2)
      )
  );
}

export function stringToCamelCase(string: string) {
  if (string && string !== "") {
    let newString = string.toLowerCase();
    newString = newString.replace(/ +(?= )/g, "").replace(/ /g, "_");
    return newString;
  }
  return string;
}

export function randomGen() {
  return Math.random().toString().substring(0, 7);
}

export const deleteClientPage = async (
  clientID: string,
  pageID: string,
  baseUrl: string
) => {
  const res = await axiosHandler({
    method: "delete",
    url: CLIENT_PAGE_URL(baseUrl) + `clients/${clientID}/page/${pageID}`,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return true;
  }
  return null;
};

export const getClientPages = async (
  clientID: string,
  currentPage: number,
  baseUrl: string
) => {
  const res = await axiosHandler({
    method: "get",
    url:
      CLIENT_PAGE_URL(baseUrl) +
      `clients/${clientID}/page?limit=10&page=${currentPage}`,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return res.data;
  }
  return null;
};

export const createClientPage = async (
  method: string,
  clientID: string,
  data: any,
  baseUrl: string,
  extra: string = ""
) => {
  let url = CLIENT_PAGE_URL(baseUrl) + `clients/${clientID}/page`;
  if (extra) {
    url += `/${extra}`;
  }
  const res = await axiosHandler({
    method,
    url,
    data,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return res.data;
  }
  return null;
};

export const getLandingPages = async (
  clientID: string,
  currentPage: number,
  baseUrl: string
) => {
  const res = await axiosHandler({
    method: "get",
    url: LANDING_PAGE_URL(baseUrl) + `pages?limit=10&page=${currentPage}`,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return res.data;
  }
  return null;
};

export const deleteLandingPage = async (
  clientID: string,
  pageID: string,
  baseUrl: string
) => {
  const res = await axiosHandler({
    method: "delete",
    url: LANDING_PAGE_URL(baseUrl) + `pages/${pageID}`,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return true;
  }
  return null;
};

export const getTemplates = async (
  clientID: string,
  currentPage: number,
  baseUrl: string
) => {
  const res = await axiosHandler({
    method: "get",
    url: LANDING_PAGE_URL(baseUrl) + `templates?limit=10&page=${currentPage}`,
    clientID,
  }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  if (res) {
    return res.data;
  }
  return null;
};