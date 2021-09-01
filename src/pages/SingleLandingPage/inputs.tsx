import { useHistory } from "react-router-dom";
import {
  Alert,
  Spinner,
  Table,
  Breadcrumb,
  DatePicker,
} from "kodobe-react-components";
import { ContextCustomType } from " ../../../src/interfaces";
import { Store } from "../../../src/state-management/storeComponent";
import { useEffect, useContext } from "react";
import { axiosHandler, errorHandler, routeTo } from "../../utils/network";
import { useState } from "react";
import { actionTypes } from "../../state-management/actions";
import { BASE_URL, LANDING_PAGE_URL } from "../../utils/urls";
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

    for (let i of inputs) {
      result.push([
        i?.key,
        i?.label,
        i?.value,
        i.pageId,
        i?.user?.email,
        i?.user?.phoneNumber,
        i.userId,
      ]);
    }

    return result;
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="tableQuestions">
          {inputs.length ? (
            <>
              <Table
                headers={[
                  "Key",
                  "Label",
                  "value",
                  "PAGE ID",
                  "EMAIL",
                  "PHONE NUMBER",
                  "USER ID",
                ]}
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
