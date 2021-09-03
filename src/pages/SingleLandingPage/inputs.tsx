import { Alert, Spinner, Table, Button } from "kodobe-react-components";
import { ContextCustomType } from " ../../../src/interfaces";
import { Store } from "../../../src/state-management/storeComponent";
import { useEffect, useContext } from "react";
import { axiosHandler, errorHandler } from "../../utils/network";
import { useState } from "react";
import { LANDING_PAGE_URL } from "../../utils/urls";
import _ from "lodash";
import Pagination from "../../components/Pagination/pagination";

export default function Inputs({ pageId }: any) {
  const [inputs, setInputs]: any = useState({});
  const [loading, setLoading] = useState(true);
  const [pageInfo, setPageInfo]: any = useState({});
  const [currentPage, setCurrentPage]: any = useState(1);
  const method = "get";
  const {
    state: { authInfo },
  }: ContextCustomType = useContext(Store);

  const url = `${LANDING_PAGE_URL}user-inputs/${pageId}?page=${currentPage}`;

  useEffect(() => {
    const getInputs = async () => {
      setLoading(true);
      await axiosHandler({
        method,
        url,
        clientID: authInfo?.clientId,
        token: authInfo?.token,
      })
        .then((res: any) => {
          let data = res.data.data;
          setInputs(data);
          setPageInfo(_.get(res.data, "page", {}));
          console.log(data, "inputs");
        })
        .catch((e: any) => {
          console.log(e);
          Alert.showError({ content: errorHandler(e) });
        });
      setLoading(false);
    };

    getInputs();
  }, [url, authInfo]);

  const getTableBody = () => {
    const result: any = [];
    let index = 0;
    for (let i of inputs) {
      index += 1;
      result.push([
        index,
        i?.label,
        i?.key,
        i?.value,
        i?.user?.name || i?.user?.phoneNumber || i?.user?.email,
      ]);
    }

    return result;
  };

  return (
    <div>
      {inputs.length ? (
        <>
          <Button className="successColorBg" onClick={() => []}>
            Export
          </Button>
          <div className="spacer-20"></div>
          <div className="spacer-20"></div>
        </>
      ) : null}

      {loading ? (
        <Spinner />
      ) : (
        <div className="tableQuestions">
          {inputs.length ? (
            <>
              <Table
                headers={["S/N", "Label", "Key", "value", "USER"]}
                data={loading ? [] : getTableBody()}
              />
              <Pagination
                counter={pageInfo.size}
                total={pageInfo.totalElements}
                current={currentPage + 1}
                onChange={setCurrentPage}
              />
            </>
          ) : (
            <span>No Inputs Found!</span>
          )}
        </div>
      )}
    </div>
  );
}
