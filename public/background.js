chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (
    tab.url.indexOf("https://app.dev1.pmidigiperf.com") > -1 &&
    changeInfo.url === undefined
  ) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          from: "InjectCSS",
          type: "injectBgCSS",
        },
        function (response) {}
      );
    });
  }
});
