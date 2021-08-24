import styles from "../styles/styles.module.scss";

type Props = {
  title: string;
  value?: string;
  onChange?: (e: any) => void;
};

export const ColorPicker = ({
  title,
  value = "#000000",
  onChange = () => null,
}: Props) => {
  return (
    <div className={styles.colorPicker}>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <h3>{title}</h3>
    </div>
  );
};
