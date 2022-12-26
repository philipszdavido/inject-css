import { useEffect, useState } from "react";
import "./App.css";
import { Alert } from "./Alert";
import CodeMirror from "@uiw/react-codemirror";

const Embed = () => {
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
      type: "revertEmbed",
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
      type: "injectEmbed",
      embed: css,
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
      type: "getEmbed",
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
        <CodeMirror
          value={css}
          options={{
            mode: "html",
            theme: "dark",
            lineNumbers: true,
            linebreak: true,
          }}
          height="250px"
          width="300px"
          onChange={(editor, data, value) => {
            changecss(editor);
          }}
          style={{ fontSize: "larger" }}
        />
      </div>
      <div className="buttonCont">
        <button onClick={injectCSSFn}>Embed</button>
        <button onClick={handleClick}>Copy</button>
        <button onClick={handleReverFn}>Un-embed</button>
      </div>
    </>
  );
};

export default Embed;
