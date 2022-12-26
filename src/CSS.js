import { useEffect, useState } from "react";
import "./App.css";
import StyleEditor from "react-style-editor";
import { Alert } from "./Alert";

const CSS = () => {
  const [css, setCSS] = useState("");
  const [{ openAlert, msg }, setAlert] = useState({
    msg: "",
    openAlert: false,
  });

  const displayAlert = (msg) => {
    setAlert({
      msg,
      openAlert: true,
    });
    setTimeout(() => setAlert({ openAlert: false, msg: "" }), 3000);
  };

  const handleClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(css).then(() => {
        displayAlert("Copied!!");
      });
    } else {
      displayAlert("Copy not supported in this browser");
    }
  };

  const handleReverFn = () => {
    const message = {
      from: "InjectCSS",
      type: "revertCSS",
    };

    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          displayAlert(response);
        });
      });
  };

  const injectCSSFn = () => {
    const message = {
      from: "InjectCSS",
      type: "injectCSS",
      css,
    };

    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {});
      });
  };

  const changecss = (e) => {
    setCSS(e);
  };

  useEffect(() => {
    const message = {
      from: "InjectCSS",
      type: "getCSS",
    };

    const queryInfo = {
      active: true,
      currentWindow: true,
    };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setCSS(response);
        });
      });
  }, []);

  return (
    <>
      <Alert open={openAlert} msg={msg} />
      <div className="container">
        <StyleEditor
          onChange={changecss}
          style={{ height: 250 }}
          defaultValue={css}
          value={css}
          readOnly={false}
        />
      </div>
      <div className="buttonCont">
        <button onClick={injectCSSFn}>Inject 💉</button>
        <button onClick={handleClick}>Copy</button>
        <button onClick={handleReverFn}>Un-inject</button>
      </div>
    </>
  );
};

export default CSS;
