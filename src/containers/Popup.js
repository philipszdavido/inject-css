import "./../App.css";
import CSS from "./../components/CSS/CSS";
import Embed from "./../components/Embed/Embed";
import { Tab, TabContent } from "./../components/Tab/Tab";
import Header from "./../components/Header";
import CustomizePage from "./../components/Customize";

const Popup = () => {
  return (
    <div className="App">
      <Header />

      <Tab heads={["CUSTOMIZE", "CSS", "EMBED"]}>
        <TabContent>
          <CustomizePage />
        </TabContent>
        <TabContent>
          <CSS />
        </TabContent>
        <TabContent>
          <Embed />
        </TabContent>
      </Tab>
    </div>
  );
};

export default Popup;
