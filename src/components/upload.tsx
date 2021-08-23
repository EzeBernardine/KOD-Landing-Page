import { Icon, IconTypes, Upload } from "kodobe-react-components";
import { useContext, useState } from "react";
import { Store } from "../state-management/storeComponent";
import styles from "../styles/styles.module.scss";
import { getClientId, getToken } from "../utils/network";
import { UPLOAD_URL } from "../utils/urls";

interface Props {
  onChange?: (e: any) => void;
  validImageTypesSrc?: string[];
  mainText?: string;
  subText?: string;
  fileName?: string;
  uploadUrl?: string;
  extraFields?: {
    name: string;
    value: any;
  }[];
}

export const UploadCustom = ({
  onChange,
  validImageTypesSrc = ["jpg", "jpeg", "png"],
  mainText = "Choose a file to Upload",
  subText = "must be PNG or JPG",
  fileName = "file",
  uploadUrl,
  extraFields,
}: Props) => {
  const [error, setError] = useState("");

  const onError = (e: any) => {
    setError(e.toString());
  };

  const {
    state: {
      baseUrls: { baseUrl },
    },
  }: any = useContext(Store);

  return (
    <div>
      <Upload
        className={styles.uploadCover}
        onChange={onChange}
        validImageTypesSrc={validImageTypesSrc}
        fileName={fileName}
        onError={onError}
        uploadUrl={uploadUrl || UPLOAD_URL(baseUrl)}
        headers={{ "client-id": getClientId(), token: getToken() }}
        extraFields={extraFields}
      >
        <div className={styles.uploadCustom}>
          <Icon size={30} iconType={IconTypes.Upload} color={"#999999"} />
          <p>{mainText}</p>
          <b>({subText})</b>
        </div>
      </Upload>
      {error !== "" && <div className={styles.uploadError}>{error}</div>}
    </div>
  );
};
