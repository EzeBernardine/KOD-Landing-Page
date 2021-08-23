export type User = {
  id: number;
  name: string;
};

export interface ObjectLiteral {
  [key: string]: any;
}

export interface ActionType {
  type: string;
  payload?: any;
}

export type DispatchType = (e: { type: string; payload: any }) => void;

export interface ContextCustomType {
  state?: any;
  dispatch?: (e: { type: string; payload: any }) => void;
}

export interface TriviaDataState {
  name: string;
  description: string;
  icon: string;
  applicationId: string;
  payingLedgerId: string;
  winningLedgerId: string;
  defaultQuestionTimeout: number;
  defaultWinningCoin: number;
  defaultCoinForAttempt: number;
  startTime: string;
  endTime: string;
  type: string;
  answerQuestionMultipleTimes: boolean;
}
export interface UpdateTriviaDataState {
  name: string;
  description: string;
  icon: string;
  applicationId: string;
  payingLedgerId: string;
  winningLedgerId: string;
  defaultQuestionTimeout: number;
  defaultWinningCoin: number;
}
export interface TriviaQuestionState {
  triviaId: string;
  label: string;
  image: string;
  tag: string;
  coin: number;
  timeout: number;
  cost: number;
  coinForAttempt: number;
  options: [
    {
      label: string;
      image: string;
      isAnswer?: boolean;
    }
  ];
}

export interface TriviaState {
  applications: object[];
  clientLedgers: object[];
}
