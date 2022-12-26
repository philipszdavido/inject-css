import { useEffect, useState } from "react";
import "./App.css";
import StyleEditor from "react-style-editor";

function App() {
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
    <div className="App">
      <header>
        <div>Inject CSS 💉</div>
      </header>
      <Alert open={openAlert} msg={msg} />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        ></div>
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
    </div>
  );
}

export default App;

const Alert = ({ msg, open }) => {
  return open && <div className="alert">{msg}</div>;
};

// html {
//     background: violet !important;
// }
// @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@100&display=swap');
// font-family: 'Chivo Mono', monospace;
