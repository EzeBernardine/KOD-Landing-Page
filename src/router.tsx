import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./pages";
import LandingPage from "./pages/landing-pages";
import CreateLandingPage from "./pages/create-landing-page";
import SingleLandingPage from "./pages/SingleLandingPage/single-landing-page";
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/landing-page" exact component={Index} />
        <Route
          path="/landing-page/landing-pages"
          exact
          component={LandingPage}
        />
        <Route
          path="/landing-page/create-landing-page"
          exact
          component={CreateLandingPage}
        />
 
        <Route
          path="/landing-page/single-landing-page/:pageId"
          exact
          component={SingleLandingPage}
        />
      </Switch>
    </BrowserRouter>
  );
}
