import { useState } from "react";
import "./App.css";
import CSS from "./CSS";
import Embed from "./Embed";

function App() {
  return (
    <div className="App">
      <header>
        <div>Inject CSS 💉</div>
      </header>

      <Tab heads={["CSS", "EMBED"]}>
        <TabContent>
          <CSS />
        </TabContent>
        <TabContent>
          <Embed />
        </TabContent>
      </Tab>
    </div>
  );
}

export default App;

const Tab = ({ heads, children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const display = children[activeIndex];

  return (
    <>
      <ul className="tabHeadContainer">
        {heads.map((head, i) => (
          <TabHead
            title={head}
            activeIndex={activeIndex}
            index={i}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </ul>
      {display}
    </>
  );
};

const TabHead = ({ title, activeIndex, index, setActiveIndex }) => {
  const active = index === activeIndex;
  return (
    <li
      className={`tabHeadItem ${active && "tabActive"}`}
      onClick={() => setActiveIndex(index)}
    >
      <a>{title}</a>
    </li>
  );
};

const TabContent = ({ active, children }) => {
  return children;
};

// html {
//     background: violet !important;
// }
// @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@100&display=swap');
// font-family: 'Chivo Mono', monospace;
