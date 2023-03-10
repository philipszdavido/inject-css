import { useEffect, useState } from "react";
import "./../../App.css";
import { Alert } from "../Alert/Alert";
import CodeMirror from "@uiw/react-codemirror";
import { sendInjectCSSMessage } from "../utils";

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
    sendInjectCSSMessage(css);
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
        <CodeMirror
          value={css || ""}
          options={{
            mode: "html",
            theme: "dark",
            lineNumbers: true,
          }}
          height="250px"
          onChange={(editor, data, value) => {
            changecss(editor);
          }}
          style={{ fontSize: "larger" }}
        />
      </div>
      <div className="buttonCont">
        <button onClick={injectCSSFn}>Inject ????</button>
        <button onClick={handleClick}>Copy</button>
        <button onClick={handleReverFn}>Un-inject</button>
      </div>
    </>
  );
};

export default CSS;

{
  /* <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Andika&display=swap" rel="stylesheet"></link> */
}
