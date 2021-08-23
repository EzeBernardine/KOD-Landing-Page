import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages";
import LandingPage from "./pages/landing-pages";
export default function Router() {
  return (
    // trivia/singleTrivia/questions
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/landing-page" exact component={Index} />
        <Route path="/landing-page/landing-pages" exact component={LandingPage} />
      </Switch>
    </BrowserRouter>
  );
}
