import { useState } from "react";
import Modal from ".";
import fonts from "../../presets/fonts/fonts";

const EmbedPresetsModal = ({ closeModal, setEmbed }) => {
  const [fontSelected, setFontselected] = useState();
  const handleEmbedSelect = (font, index) => {
    // if font exist remove it
    if (fontSelected?.index === index) {
      return setFontselected({});
    }
    setFontselected({
      ...font,
      index,
    });
  };

  const handleSetFont = () => {
    setEmbed(fontSelected);
  };
  const closeFn = () => {
    closeModal();
  };

  return (
    <Modal closeFn={closeFn}>
      <ul className="EmbedPresetsModal">
        {fonts.map((font, i) => (
          <li
            className={fontSelected?.index === i && `selected`}
            onClick={() => handleEmbedSelect(font, i)}
          >
            <a>{font.name}</a>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleSetFont}>Set Font</button>
      </div>
    </Modal>
  );
};

export default EmbedPresetsModal;
