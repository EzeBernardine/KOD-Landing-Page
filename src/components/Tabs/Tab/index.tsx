import React from "react";
import propTypes from "prop-types";
import "../styles.scss";

const Tab = ({ activeTab, id, onClick }: any) => {
  const onClickTab = () => onClick(id);
  
  return (
    <li
      className={activeTab === id ? "tab-list-active ListItem" : "ListItem"}
      onClick={onClickTab}
    >
      {id}
      {activeTab === id ? <div className="Animate"></div> : null}
    </li>
  );
};

Tab.propTypes = {
  activeTab: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
};
export default Tab;
