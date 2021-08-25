import {
  Alert,
  Button,
  Divider,
  FormGroup,
  IconTypes,
  Input,
  TextArea,
  Select,
} from "kodobe-react-components";
import React, { useContext, useEffect, useState } from "react";
import { actionTypes } from "../../state-management/actions";
import { Store } from "../../state-management/storeComponent";
import styles from "../../styles/styles.module.scss";
import { GenerateID } from "../../utils/generateID";
import { axiosHandler, errorHandler } from "../../utils/network";
import { GAMING_URL, BILLING_URL, LANDING_PAGE_URL } from "../../utils/urls";

export default function InputsDefinition() {
  const {
    state: { landingPageData, authInfo },
    dispatch,
  }: any = useContext(Store);

  const [games, setGames]: any = useState([]);
  const [isReward, setIsRewarded] = useState(false);
  const [ledgers, setLedgers]: any = useState([]);
  const [ledger, setLedger]: any = useState([]);
  const [state, setState]: any = useState({
    // whoIsEligible: "",
    message: "",
    actionURL: "",
  });
  const [eligibility, setEligibility]: any = useState("");
  const [game, setGame] = useState("");
  const [playAmount, setPlayAmount] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [webHookUrl, setWebHookUrl] = useState("");
  //   const [interactionButtonText, setInteractionButtonText] = useState("");
  //   const [bgTextMain, setBgTextMain] = useState("");
  //   const [bgTextSub, setBgTextSub] = useState("");
  //   const [inputSubmitButtonText, setInputSubmitButtonText] = useState("");
  //   const [formSubmitUrl, setFormSubmitUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [inputs, setInputs]: any = useState([]);
  const [asMounted, setAsMounted] = useState(false);

  const getGames = async () => {
    const res = await axiosHandler({
      method: "get",
      url: GAMING_URL + "gameInstances",
      clientID: authInfo?.clientId,
    }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
    if (res) {
      setGames(
        res.data._embedded.gameInstances.map((item: any) => ({
          title: item.label,
          value: item.id,
        }))
      );
    }
  };
  const getLedgers = async () => {
    const res = await axiosHandler({
      method: "get",
      url: BILLING_URL + "client-ledger",
      clientID: authInfo?.clientId,
    }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
    if (res) {
      setLedgers(
        res.data._embedded.clientLedgers.map((item: any) => ({
          title: item.name,
          value: item.id,
        }))
      );
    }
  };
  //   const getTemplate = async () => {
  //     const res = await axiosHandler({
  //       method: "post",
  //       url: LANDING_PAGE_URL + "templates",
  //       data: {
  //         name: "Summer",
  //         image:
  //           "https://thebrownidentity.com/wp-content/uploads/2020/07/01-birth-month-If-You-Were-Born-In-Summer-This-Is-What-We-Know-About-You_644740429-icemanphotos.jpg",
  //         tag: "winteriiiii",
  //       },
  //       clientID: authInfo?.clientId,
  //     }).catch((e: any) => Alert.showError({ content: errorHandler(e) }));
  //     if (res) {
  //       console.log(res);
  //       setLedgers(
  //         res.data._embedded.clientLedgers.map((item: any) => ({
  //           title: item.name,
  //           value: item.id,
  //         }))
  //       );
  //     }
  //   };

  const getObjectFromArray = (arrayValue: any) => {
    const resultObject: any = {};
    for (const i of arrayValue) {
      resultObject[i.label] = i.value;
    }
    return resultObject;
  };

  useEffect(() => {
    if (landingPageData) {
      setGame(landingPageData.gameProps.gameId);
      setRedirectUrl(landingPageData.gameEndProps.redirectUrl);
      setPageTitle(landingPageData.title);
      setPageSlug(landingPageData.slug);
      setWebHookUrl(landingPageData.webhook);
      setInputs(
        Object.keys(landingPageData.gameEndProps.inputs).map((item: any) => ({
          label: item,
          key: landingPageData.gameEndProps.inputs[item],
        }))
      );
      setAsMounted(true);
    }
    getGames();
    getLedgers();
  }, []);

  useEffect(() => {
    if (!asMounted) return;
    dispatch({
      type: actionTypes.updateLandingPageInfo,
      payload: {
        ...landingPageData,
        gameProps: {
          ...landingPageData.gameProps,
        },
        title: pageTitle,
        slug: pageSlug,
        gameInstanceId: game,
        winningLedgerId: ledger,
        isHurdleRequired: isReward,
        eligibility: eligibility,
        nonEligibilityMessage: state,
        webhook: webHookUrl,
        inputs: inputs,
        redirectURL: redirectUrl,
        templateId: null,
      },
    });
  }, [
    game,
    pageSlug,
    pageTitle,
    playAmount,
    redirectUrl,
    // interactionButtonText,
    // bgTextMain,
    isReward,
    webHookUrl,
    // bgTextSub,
    // inputSubmitButtonText,
    inputs,
  ]);

  const changeInputs = (e: any, i: number) => {
    setInputs(
      inputs.map((item: any, ind: number) => {
        if (ind === i) {
          item[e.target.name] = e.target.value;
        }
        return item;
      })
    );
  };

  const removeInput = (i: number) => {
    setInputs(inputs.filter((_: any, d: number) => d !== i));
  };

  const addToInput = () => {
    setInputs([...inputs, { label: "", key: "" }]);
  };

  return (
    <div>
      <Divider className="dividerCustom" />
      <div className={styles.header}>
        <h3>Define your Landing Page Inputs</h3>
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />

      <div className="inputField">
        <FormGroup label="Page Title" htmlFor="">
          <Input
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Specify Landing Page Title"
            required
          />
        </FormGroup>
        <FormGroup label="Page Slug (Unique)" htmlFor="">
          <Input
            value={pageSlug}
            onChange={(e) => setPageSlug(e.target.value)}
            placeholder="Define unique page slug"
            required
          />
        </FormGroup>
        <FormGroup label="Select Game" htmlFor="">
          <Select
            placeholder="Select Game to play"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            options={games}
          />
        </FormGroup>
        <FormGroup label="Select Ledger" htmlFor="">
          <Select
            placeholder="Select Game to play"
            value={ledger}
            onChange={(e) => setLedger(e.target.value)}
            options={ledgers}
          />
        </FormGroup>
      </div>

      <div className="spacer-20" />
      <div className="spacer-10" />

      <Divider className="dividerCustom" />
      <div className="fieldSet">
        <FormGroup
          label="Who is eligible for this landing page gamification?"
          htmlFor=""
        >
          <Select
            placeholder="Who is eligible for this landing page gamification?"
            value={eligibility}
            onChange={(e) => setEligibility(e.target.value)}
            id={GenerateID(15)}
            options={[
              { title: "Everyone", value: "everyone" },
              { title: "Customers", value: "customers" },
            ]}
          />
        </FormGroup>
        <div className="spacer-20" />
        <FormGroup label="Message for Non-Eligible Customers" htmlFor="">
          <TextArea
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            placeholder="Enter a message for users that are not eligible"
            required={false}
          />
        </FormGroup>
        <div className="spacer-20" />
        <FormGroup
          label="Where Should We Redirect Non-Eligible Customers to?"
          htmlFor=""
        >
          <Input
            value={state.actionURL}
            onChange={(e) => setState({ ...state, actionURL: e.target.value })}
            placeholder="Enter url to redirect to when user is not eligible"
            required={false}
          />
        </FormGroup>
      </div>
      <Divider className="dividerCustom" />

      <div className="spacer-20" />
      <div className="spacer-10" />

      <div className="inputField">
        <FormGroup
          label="Where do we redirect the user after all activity?"
          htmlFor=""
        >
          <Input
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            placeholder="Enter url to redirect to when game is complete"
            required={false}
          />
        </FormGroup>

        <div className="tooltip">
          <FormGroup label="Data Collection Webhook" htmlFor="">
            {/* <span>Tooltip</span> */}
            <Input
              value={webHookUrl}
              onChange={(e) => {
                setWebHookUrl(e.target.value);
                console.log(webHookUrl, "webHookUrl");
              }}
              placeholder="Enter data collection url"
              required={false}
            />
          </FormGroup>
        </div>
      </div>
      <div className="spacer-20" />

      <div className="checkField">
        <label htmlFor="">Does this page require a reward/goal?</label>
        <input
          type="checkbox"
          onClick={(e) => {
            let { checked } = e.target as HTMLInputElement;
            checked ? setIsRewarded(true) : setIsRewarded(false);
            console.log(isReward);
          }}
          defaultChecked={false}
        />
      </div>
      <Divider className="dividerCustom" />

      <div className={styles.header}>
        <h3>Define your form inputs</h3>
        {/* <p>You can choose up to 4 brand colour that sooth you</p> */}
      </div>
      <div className="spacer-20" />
      <div className="spacer-10" />
      {inputs.map((item: any, i: number) => (
        <div key={i} className="LandingInputsCard">
          <div onClick={() => removeInput(i)} className="deleteInput">
            &#10006;
          </div>
          <div className="inputField ">
            <FormGroup label={` Label`} htmlFor="">
              <Input
                value={item.label}
                name="label"
                onChange={(e: any) => changeInputs(e, i)}
                placeholder="enter input label"
                required
              />
            </FormGroup>
            <FormGroup label={` Key`} htmlFor="">
              <Input
                value={item.key}
                name="key"
                onChange={(e: any) => changeInputs(e, i)}
                placeholder="enter input key"
                required
              />
            </FormGroup>
          </div>
          <br />
          <br />
        </div>
      ))}

      <br />
      <Button className="successColorBg" onClick={addToInput}>
        Add Input
      </Button>
    </div>
  );
}
