chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (urlStartsWith(tab) && changeInfo.url === undefined) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          from: "InjectCSS",
          type: "injectBgCSS",
        },
        function (response) {}
      );
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          from: "InjectCSS",
          type: "injectBgEmbed",
        },
        function (response) {}
      );
    });
  }
});

const urlStartsWith = (tab) => {
  const URLS = ["https://app.dev1.pmidigiperf.com", "http://localhost:9000"];
  //   return (
  //     tab.url.indexOf("https://app.dev1.pmidigiperf.com") > -1 ||
  //     tab.url.indexOf("http://localhost:9000") > -1
  //   );
  return URLS.some((url) => tab.url.indexOf(url) > -1);
};
