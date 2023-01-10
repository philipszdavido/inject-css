import "./App.css";
import Dashboard from "./components/Dashboard";
import Popup from "./containers/Popup";

function App() {
  const href = window.location.href;

  const isNewTab = href.endsWith("?new-tab");
  if (isNewTab) {
    return <Dashboard />;
  }
  return <Popup />;
}

export default App;

// html {
//     background: violet !important;
// }
// @import url('https://fonts.googleapis.com/css2?family=Chivo+Mono:wght@100&display=swap');
// font-family: 'Chivo Mono', monospace;
