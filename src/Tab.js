import { useState } from "react";

export const Tab = ({ heads, children }) => {
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

export const TabHead = ({ title, activeIndex, index, setActiveIndex }) => {
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

export const TabContent = ({ active, children }) => {
  return children;
};
