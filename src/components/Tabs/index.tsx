import React, { useState } from "react";
import propTypes from "prop-types";
import "./styles.scss";
import Tab from "./Tab";
import { GenerateID } from "../../utils/generateID";

interface State {
  click: (e: any) => any;
  children?: JSX.Element | JSX.Element[] |any ;
}

const Tabs = ({ click, children }: State) => {
  const [activeTab, setActiveTab] = useState(children[0].props.id);

  const onClickTabItem = (tab: any) => {
    click(tab);
    setActiveTab(tab);
  };
  return (
    <div>
      <ol className="TabList">
        {children.map((child: any) => {
          const { id } = child.props;
          return (
            <Tab
              activeTab={activeTab}
              key={GenerateID(15)}
              id={id}
              onClick={onClickTabItem}
            />
          );
        })}
      </ol>
      <div className="TabContent">
        {children.map((child: any) => {
          if (child.props.id !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  children: propTypes.instanceOf(Array).isRequired,
};
export default Tabs;
