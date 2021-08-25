import { TemplateProps } from "kodobe-template-builder";
import { getClientId, getToken } from "../utils/network";

// const colorTheme = {
//   mainColor: "#0600ff",
//   contentColor: "#ffffff",
// };
const colorTheme = "#0600ff";

export const defaultTemplateData: TemplateProps = {
  uiFeatures: {
    logo: "https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg",
    backgroundImage:
      "https://cdn.pixabay.com/photo/2018/01/03/05/33/the-sun-3057622_960_720.jpg",
    colorTheme,
    gameGraphics:
      "https://media.istockphoto.com/photos/wheel-fortune-18-area-picture-id517569280?b=1&k=6&m=517569280&s=170667a&w=0&h=xUTnSOiKwoc4Rl6PLJlmiwgAtsu1PaIFPefZEjJBAgc=",
  },
  gameProps: {
    gameplayUrl: "https://staging-api.kodobe.net/gaming/",
    gameUrl: "https://spin-the-wheel.kodobe.org",
    gameId: "10955d01-4dca-4313-bf16-729818139c5b",
    spinAmount: 100,
    clientInfo: {
      clientId: getClientId(),
      userId: "6059d6f3d9b285001cf6be38",
      logo: "https://cdn.pixabay.com/photo/2021/07/29/20/23/mountains-6508015_960_720.jpg",
    },
    token: getToken(),
  },
  gameEndProps: {
    status: false,
    playData: {},
    redirectUrl: "",
    winImage:
      "https://image.shutterstock.com/image-illustration/youve-won-rubber-stamp-over-260nw-158040608.jpg",
    lossImage:
      "https://image.shutterstock.com/image-vector/you-lose-red-rubber-stamp-260nw-244769227.jpg",
    inputSubmitButtonText: "Claim Price",
    inputs: {
      Name: "name",
      Phone: "phone",
    },
    submitUrl: "https://google.com",
    playAgainText: "Play Again",
  },
  interactionButtonText: "SPIN",
  bgTextMain: "SPIN TO WIN",
  bgTextSub: "SPIN TO WIN ENTRIES INTO Stanbic IBTC DAILY CASH SWEEP.",
};
