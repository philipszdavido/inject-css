export const sendInjectEmbedMessage = (
  css,
  responseCallback = (response) => response
) => {
  const message = {
    from: "InjectCSS",
    type: "injectEmbed",
    embed: css,
  };

  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  chrome.tabs &&
    chrome.tabs.query(queryInfo, (tabs) => {
      const currentTabId = tabs[0].id;
      chrome.tabs.sendMessage(currentTabId, message, (response) => {
        responseCallback(response);
      });
    });
};

export const sendInjectCSSMessage = (css, callbakcfn = (res) => res) => {
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
      chrome.tabs.sendMessage(currentTabId, message, (response) => {
        callbakcfn(response);
      });
    });
};
