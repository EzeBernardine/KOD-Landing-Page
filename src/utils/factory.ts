import { ObjectLiteral } from "../interfaces";
/**
 *
 * @param {String} date
 * @returns date in YYY-MM-DD HH:mm:ss format
 */
export const DateFormatter = (date: ObjectLiteral) =>
  [date.getMonth() + 1, date.getDate(), date.getFullYear()].join("/") +
  " " +
  [date.getHours(), date.getMinutes(), date.getSeconds()].join(":");

/**
 *
 * @param dateTime
 * @returns if a string is a valid date
 */
export const ValidateDate = (dateTime: string, today: any) => {
  let p: any = new Date(dateTime);
  let isDate: boolean = !isNaN(p);
  let h: any[] = dateTime.split(" ");
  if (!h[1] || !isDate) return false;

  let emptyArray: any[] = [];
  [...h[0].split("-"), ...h[1].split(":")].map((item: any) =>
    emptyArray.push(item)
  );
  let isOfLenght2: any = (index: any) => emptyArray[index].length === 2;
  let YYYY: any = emptyArray[0].length === 4;
  let MM: boolean = emptyArray[1] <= 12 && isOfLenght2(1);
  let DD: boolean = emptyArray[2] <= 31 && isOfLenght2(2);
  let HH: boolean = emptyArray[3] <= 24 && isOfLenght2(3);
  let mm: boolean = emptyArray[4] <= 60 && isOfLenght2(4);
  let ss: boolean = emptyArray[5] <= 60 && isOfLenght2(5);
  let date = new Date(dateTime);

  let futureDate = date > new Date(today);
  return YYYY && MM && DD && HH && mm && ss && isDate && futureDate;
};

/**
 *
 * @param initialArray
 * @param keyArray
 * @returns a new array of required key
 */
export const extractAnArrayOfRequiredKey = (
  initialArray: object[],
  keyArray: []
) => {
  const result = [];
  for (let i = 0; i < initialArray.length; i++) {
    let match = true;
    const objectStore = {};
    for (let j = 0; j < keyArray.length; j++) {
      if (
        Object.keys(initialArray[i]).includes(keyArray[j]) &&
        match &&
        j === keyArray.length - 1
      ) {
        objectStore[keyArray[j]] = initialArray[i][keyArray[j]];
        result.push(objectStore);
      }
      if (!Object.keys(initialArray[i]).includes(keyArray[j])) {
        match = false;
      }
      if (Object.keys(initialArray[i]).includes(keyArray[j])) {
        objectStore[keyArray[j]] = initialArray[i][keyArray[j]];
      }
    }
  }

  return result;
};

/**
 *
 * @param str
 * @returns a true of false based on if a url is valid or not
 */
export const ValidURL = (url: string) => {
  let pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(url);
};

/**
 * Truncate
 * returns the truncated text with "..." or any specified ending character
 * @param {String} str
 * @param {Number} length
 * @param {String} ending
 * */
export const truncate = (
  str: string = "",
  length: number = 20,
  ending: string = "..."
) =>
  str.length > length
    ? `${str.substring(0, length - ending.length)}${ending}`
    : str;

/**
 * 
 * @param unixTimestamp 
 * @returns readable date format
 */
    export const GetDate = (unixTimestamp: number) => {
      let date = new Date(unixTimestamp * 1000);
      return (
        date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
      );
    };