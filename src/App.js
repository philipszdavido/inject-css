import { useRef, useState } from "react";
import "./App.css";
import StyleEditor from "react-style-editor";

function App() {
  const ref = useRef();
  const [elements, setElements] = useState([
    {
      name: "html",
      css: "",
      type: "tag",
    },
  ]);
  const injectCSSFn = () => {
    const message = {
      from: "InjectCSS",
      css: elements,
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

  const addMoreFn = () => {
    setElements((prev) => [
      ...prev,
      {
        name: "",
        css: "",
        type: "tag",
      },
    ]);
  };

  const onChangeCSS = (obj, index) => {
    // get obj from state

    setElements((prev) => {
      const p = [...prev];
      const t = p[index];

      if (obj.name === "element") {
        t.name = obj.value;
      }

      if (obj.name === "css") {
        t.css = obj.value;
      }

      if (obj.name === "type") {
        t.type = obj.value;
      }

      return p;
    });
  };

  const closeElement = (index) => {
    setElements((prev) => {
      return [...prev.filter((_, i) => i !== index)];
    });
  };

  return (
    <div className="App">
      <header>
        <div>Inject CSS</div>
      </header>

      <div className="container">
        {elements.map((el, i) => (
          <Element
            key={i}
            {...el}
            onChangeCSS={(obj) => onChangeCSS(obj, i)}
            closeElement={() => closeElement(i)}
          />
        ))}
      </div>
      <div className="buttonCont">
        <button onClick={addMoreFn}>Add more</button>
        <button onClick={injectCSSFn}>Inject CSS</button>
      </div>
    </div>
  );
}

const Element = ({ name, css, type, onChangeCSS, closeElement }) => {
  const changename = (e) => {
    onChangeCSS({
      name: "element",
      value: e.target.value,
    });
  };

  const changecss = (e) => {
    onChangeCSS({
      name: "css",
      value: e,
    });
  };

  const changetype = (e) => {
    onChangeCSS({
      name: "type",
      value: e.target.value,
    });
  };

  const processCss = () => {
    if (type === "tag") {
      return name + " {" + css + "}";
    }
  };

  return (
    <div className="element">
      <div className="closeCont">
        <button onClick={closeElement}>X</button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginRight: "6px",
          }}
        >
          <label>Element:</label>
          <input
            onChange={changename}
            value={name}
            placeholder="Type element name here..."
          />
        </div>{" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label>Type: </label>
          <select value={type} onChange={changetype}>
            <option value="tag">tag</option>
            <option value="class">class</option>
            <option value="id">id</option>
          </select>
        </div>
      </div>
      <div>
        CSS:
        <StyleEditor
          onChange={changecss}
          style={{ height: 200 }}
          defaultValue={processCss()}
        />
      </div>
    </div>
  );
};

export default App;
