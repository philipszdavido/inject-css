import elements from "./element";
import "./Customize.css";

const CustomizePage = () => {
  const handleSet = () => {};
  const handleCopy = () => {};
  const handleUnSet = () => {};
  const popularElements = [...elements].filter((el) =>
    el.includes(["html", "div", "button", "span"])
  );

  return (
    <>
      <div className="container">
        <div className="customizeContainer">
          <div className="elementsList">
            <div>
              <p>Popular elements</p>
              <ul className="">
                {popularElements.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
            <div>
              <p>All elements</p>
              <ul className="">
                {elements.map((element) => (
                  <li key={element}>{element}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="utilityClasses"></div>
        </div>
      </div>

      <div className="buttonCont">
        <button onClick={handleSet}>Set</button>
        <button onClick={handleCopy}>Copy</button>
        <button onClick={handleUnSet}>Revert</button>
      </div>
    </>
  );
};

export default CustomizePage;
