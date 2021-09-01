import { Spinner } from "kodobe-react-components";
import { GenerateID } from "../../utils/generateID";
import "../../styles/cards.scss";

const Reports = ({ reports }: any) => {
  return (
    <>
      {reports?.length ? (
        <div className="vote-diff-points">
          {reports.length ? (
            reports.map((report: any, i: number) => (
              <div className="vote-card" key={GenerateID(17)}>
                <div className="vote-points">
                  <div className="vote-total-point">
                    <b>{report.value}</b>
                  </div>

                  <div className="vote-rate">
                    <span>{report.label}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span>No Reports</span>
          )}
        </div>
      ) : (
        <span>No Report Logs Found!</span>
      )}
    </>
  );
};
export default Reports;
