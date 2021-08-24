import { routeTo } from "../utils/network";
import { useHistory } from "react-router-dom";

export default function Index() {
  const history = useHistory();

  return (
    <div>
      <h3>Quick Links</h3>
      <div className="spacer-20"></div>
      <div className="spacer-10"></div>

      <div
        className="linkColor pointer"
        onClick={() => routeTo("/landing-page/landing-pages", history)}
      >
        <div className="linkColor pointer">Landing Pages</div>
      </div>
    </div>
  );
}
