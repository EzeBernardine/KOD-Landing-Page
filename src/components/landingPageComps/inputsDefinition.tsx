import {
  Alert,
  Button,
  Divider,
  FormGroup,
  Input,
  Select,
} from "kodobe-react-components";
import React, { useContext, useEffect, useState } from "react";
import { actionTypes } from "../../state-management/actions";
import { Store } from "../../state-management/storeComponent";
import styles from "../../styles/styles.module.scss";
import { axiosHandler, errorHandler, getClientId } from "../../utils/network";
import { GAMING_URL } from "../../utils/urls";

export default function InputsDefinition() {
  const {
    state: {
      landingPageData,
      baseUrls: { baseUrl },
    },
    dispatch,
  }: any = useContext(Store);

  const [games, setGames]: any = useState([]);
  const [game, setGame] = useState("");
  const [playAmount, setPlayAmount] = useState(0);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [interactionButtonText, setInteractionButtonText] = useState("");
  const [bgTextMain, setBgTextMain] = useState("");
  const [bgTextSub, setBgTextSub] = useState("");
  const [inputSubmitButtonText, setInputSubmitButtonText] = useState("");
  const [formSubmitUrl, setFormSubmitUrl] = useState("");
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [inputs, setInputs]: any = useState([]);
  const [asMounted, setAsMounted] = useState(false);

  const getGames = async () => {
    const res = await axiosHandler({
      method: "get",
      url: GAMING_URL(baseUrl) + "/gameInstances",
      clientID: getClientId(),
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
      setPlayAmount(landingPageData.gameProps.spinAmount);
      setRedirectUrl(landingPageData.gameEndProps.redirectUrl);
      setInteractionButtonText(landingPageData.interactionButtonText);
      setBgTextMain(landingPageData.bgTextMain);
      setBgTextSub(landingPageData.bgTextSub);
      setFormSubmitUrl(landingPageData.gameEndProps.submitUrl);
      setPageTitle(landingPageData.title);
      setPageSlug(landingPageData.slug);
      setInputs(
        Object.keys(landingPageData.gameEndProps.inputs).map((item: any) => ({
          label: item,
          value: landingPageData.gameEndProps.inputs[item],
        }))
      );
      setInputSubmitButtonText(
        landingPageData.gameEndProps.inputSubmitButtonText
      );
      setAsMounted(true);
    }
    getGames();
  }, []);

  useEffect(() => {
    if (!asMounted) return;
    dispatch({
      type: actionTypes.updateLandingPageInfo,
      payload: {
        ...landingPageData,
        gameProps: {
          ...landingPageData.gameProps,
          gameId: game,
          spinAmount: playAmount,
        },
        gameEndProps: {
          ...landingPageData.gameEndProps,
          redirectUrl: redirectUrl,
          inputSubmitButtonText: inputSubmitButtonText,
          submitUrl: formSubmitUrl,
          inputs: getObjectFromArray(inputs),
        },
        interactionButtonText: interactionButtonText,
        bgTextMain: bgTextMain,
        bgTextSub: bgTextSub,
        title: pageTitle,
        slug: pageSlug,
      },
    });
  }, [
    game,
    pageSlug,
    pageTitle,
    playAmount,
    redirectUrl,
    interactionButtonText,
    bgTextMain,
    bgTextSub,
    inputSubmitButtonText,
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
    setInputs([...inputs, { label: "", value: "" }]);
  };

  return (
    <div>
      <Divider className="dividerCustom" />
      <div className={styles.header}>
        <h3>Define your Landing Page Inputs</h3>
        {/* <p>You can choose up to 4 brand colour that sooth you</p> */}
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
            value={game}
            onChange={(e) => setGame(e.target.value)}
            options={games}
          />
        </FormGroup>
        {/* <FormGroup label="Play Amount" htmlFor="">
            <Input
              value={playAmount}
              onChange={(e) => setPlayAmount(e.target.value)}
              placeholder="Enter amount to play game"
            />
          </FormGroup> */}
        <FormGroup label="Redirect Url" htmlFor="">
          <Input
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            placeholder="Enter url to redirect to when game is complete"
            required={false}
          />
        </FormGroup>
        {/* <FormGroup label="Interaction Button Text" htmlFor="">
            <Input
              value={interactionButtonText}
              onChange={(e) => setInteractionButtonText(e.target.value)}
              placeholder="Main screen button text"
            />
          </FormGroup> */}
        {/* <FormGroup label="Bg Main Text" htmlFor="">
            <Input
              value={bgTextMain}
              onChange={(e) => setBgTextMain(e.target.value)}
              placeholder="Main main screen text"
            />
          </FormGroup> */}
        {/* <FormGroup label="Bg Sub Text" htmlFor="">
            <Input
              value={bgTextSub}
              onChange={(e) => setBgTextSub(e.target.value)}
              placeholder="Main sub screen text"
            />
          </FormGroup> */}
        {/* <FormGroup label="Input Submit Button Text" htmlFor="">
            <Input
              value={inputSubmitButtonText}
              onChange={(e) => setInputSubmitButtonText(e.target.value)}
              placeholder="Inputs submit button text"
            />
          </FormGroup> */}
        {/* <FormGroup label="Inputs Submit Url" htmlFor="">
            <Input
              value={formSubmitUrl}
              onChange={(e) => setFormSubmitUrl(e.target.value)}
              placeholder="url to submit inputs"
            />
          </FormGroup> */}
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
          <Button onClick={() => removeInput(i)}>Delete</Button>
          <FormGroup label={`Input${i + 1} Label`} htmlFor="">
            <Input
              value={item.label}
              name="label"
              onChange={(e: any) => changeInputs(e, i)}
              placeholder="enter input label"
              required
            />
          </FormGroup>
          <FormGroup label={`Input${i + 1} Value`} htmlFor="">
            <Input
              value={item.value}
              name="value"
              onChange={(e: any) => changeInputs(e, i)}
              placeholder="enter input value"
              required
            />
          </FormGroup>
          <br />
          <br />
        </div>
      ))}

      <br />
      <Button onClick={addToInput}>Add Input</Button>
    </div>
  );
}