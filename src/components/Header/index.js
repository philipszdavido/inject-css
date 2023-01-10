import React from "react";
import SettingsIcon from "./../../icons/SettingsIcon";
import "./Header.css";

const Header = () => {
  const goPremeium = () => {
    chrome.tabs.create({ url: "index.html?new-tab" });
  };

  return (
    <header>
      <div className="headerTitle">Inject CSS 💉</div>
      <div>
        <a onClick={goPremeium}>Go Premium💎</a>
        <a>
          <SettingsIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
