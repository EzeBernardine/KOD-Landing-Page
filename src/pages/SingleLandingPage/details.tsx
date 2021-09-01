import { Spinner, Table } from "kodobe-react-components";
import { GenerateID } from "../../utils/generateID";
import { GetDate } from "../../utils/index";
import "../../styles/cards.scss";

const Details = ({ landingPage }: any) => {
  return (
    <div>
      {landingPage ? (
        <>
          <div className="spacer-20"></div>
          <div className="spacer-20"></div>
          <div className="grid grid-3">
            <div className="itemMain">
              <div className="info">Title</div>
              <div className="content">{landingPage.title}</div>
            </div>
            <div className="itemMain">
              <div className="info">Slug</div>
              <div className="content">{landingPage.slug}</div>
            </div>
            <div className="itemMain">
              <div className="info">Game Instance ID</div>
              <div className="content">{landingPage.gameInstanceId}</div>
            </div>
          </div>
          <div className="spacer-20"></div>
          <div className="spacer-20"></div>
          <div className="grid grid-3">
            <div className="itemMain">
              <div className="info">Eligibility</div>
              <div className="content">
                {landingPage?.isEligible?.toString()}
              </div>
            </div>

            <div className="itemMain">
              <div className="info">Is hurdled</div>
              <div className="content">
                {landingPage?.isHurdleRequired?.toString()}
              </div>
            </div>
            <div className="itemMain">
              <div className="info">Client ID</div>
              <div className="content">{landingPage.clientId}</div>
            </div>
          </div>
          <div className="spacer-20"></div>
          <div className="spacer-20"></div>
          <div className="grid grid-3">
            <div className="itemMain">
              <div className="info">Requires Input</div>
              <div className="content">
                {landingPage?.requireInput?.toString()}
              </div>
            </div>

            <div className="itemMain">
              <div className="info">Main color</div>
              <div className="content">
                {landingPage.uiFeatures?.colorTheme?.mainColor}
              </div>
            </div>

            <div className="itemMain">
              <div className="info">Content color</div>
              <div className="content">
                {landingPage.uiFeatures?.colorTheme?.contentColor}
              </div>
            </div>
          </div>
          <div className="spacer-20"></div>
          <div className="spacer-20"></div>
          <div className="grid grid-3">
            <div className="itemMain">
              <div className="info">Background </div>
              <div className="content frame">
                <img src={landingPage?.uiFeatures?.backgroundImage} alt="" />
              </div>
            </div>

            <div className="itemMain">
              <div className="info">Logo </div>
              <div className="content frame">
                <img src={landingPage?.uiFeatures?.logo} alt="" />
              </div>
            </div>
            <div className="itemMain">
              <div className="info">Created At</div>
              <div className="content">{GetDate(landingPage.createdAt)}</div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default Details;
