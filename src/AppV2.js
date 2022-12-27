import "./App.css";
import CSS from "./CSS";
import Embed from "./Embed";
import { Tab, TabContent } from "./Tab";

function App() {
  return (
    <div className="App">
      <header>
        <div className="headerTitle">Inject CSS 💉</div>
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

// html {
//     background: violet !important;
// }
// @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@100&display=swap');
// font-family: 'Chivo Mono', monospace;
