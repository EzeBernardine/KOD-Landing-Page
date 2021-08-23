export const BASE_URL = process.env.REACT_APP_BASE_ENDPOINT;

export const BILLING_URL = BASE_URL + "billing/";
export const TRIVIA_URL = BASE_URL + "trivias/";
export const UPLOAD_URL = (BASE_URL: string) => BASE_URL + "files/v1/upload ";

export const LANDING_PAGE_URL = (BASE_URL: string) =>
  BASE_URL + "landing-page/v1/";
export const CLIENT_PAGE_URL = (BASE_URL: string) => BASE_URL + "clients/v1/";
export const GAMING_URL = BASE_URL + "games/";
