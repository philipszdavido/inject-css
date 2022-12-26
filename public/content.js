const messagesFromReactAppListener = (message, sender, response) => {
  const InjectCSS = (css = "") => {
    const head = document.head || document.getElementsByTagName("head")[0];
    let styleEl;
    // check if style tag with injectCSS is present
    styleEl = document.getElementById("injectCSS");
    if (styleEl) {
      if (styleEl.styleSheet) {
        // This is required for IE8 and below.
        styleEl.styleSheet.cssText = css;
      } else {
        const child = styleEl.childNodes[0];
        child instanceof Node && styleEl.removeChild(child);
        styleEl.appendChild(document.createTextNode(css));
      }
      return;
    }

    // create a style tag
    styleEl = document.createElement("style");
    styleEl.id = "injectCSS";
    head.appendChild(styleEl);

    styleEl.type = "text/css";
    if (styleEl.styleSheet) {
      // This is required for IE8 and below.
      styleEl.styleSheet.cssText = css;
    } else {
      styleEl.appendChild(document.createTextNode(css));
    }
  };

  const getCSS = () => {
    // const styleEl = document.getElementById("injectCSS");
    // return styleEl?.innerText || "";
    return localStorage.getItem("css");
  };

  const revertCSS = () => {
    try {
      const styleEl = document.getElementById("injectCSS");
      if (styleEl.styleSheet) {
        // This is required for IE8 and below.
        styleEl.styleSheet.cssText = "";
      } else {
        const child = styleEl.childNodes[0];
        styleEl.removeChild(child);
        styleEl.appendChild(document.createTextNode(css));
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const InjectEmbed = (embed = "") => {
    const head = document.head || document.getElementsByTagName("head")[0];

    const tempNode = document.createElement("div");
    tempNode.innerHTML = embed;
    tempNode.id = "embedNode";
    const childNodes = tempNode.childNodes;

    // for (const node of childNodes) {
    // }
    head.appendChild(tempNode);
  };

  const getEmbed = () => {
    return document.getElementById("embedNode").innerHTML;
  };

  const revertEmbed = () => {
    const head = document.head || document.getElementsByTagName("head")[0];
    const embedNode = document.getElementById("embedNode");
    if (embedNode) {
      head.removeChild(embedNode);
    }
  };

  if (sender.id === chrome.runtime.id && message.from === "InjectCSS") {
    const type = message.type;
    switch (type) {
      case "injectCSS":
        const cssToInject = message.css || localStorage.getItem("css");
        localStorage.setItem("css", cssToInject);
        InjectCSS(cssToInject);
        response(true);
        break;

      case "getCSS":
        response(getCSS());
        break;

      case "revertCSS":
        response(revertCSS() ? "Done" : "Error");
        break;
      case "injectBgCSS":
        const css = localStorage.getItem("css");
        InjectCSS(css);
        response(true);
        break;

      case "injectEmbed":
        const EmbedToInject = message.embed || localStorage.getItem("Embed");
        localStorage.setItem("Embed", EmbedToInject);
        InjectEmbed(EmbedToInject);
        response(true);
        break;

      case "getEmbed":
        response(getEmbed());
        break;

      case "revertEmbed":
        response(revertEmbed() ? "Done" : "Error");
        break;

      case "injectBgEmbed":
        const Embed = localStorage.getItem("Embed");
        InjectEmbed(Embed);
        response(true);
        break;

      default:
        break;
    }
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
