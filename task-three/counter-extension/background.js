chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.sendMessage(tab.id, {
    action: {
      toggle: "togglePopup",
      id: tab.id,
    },
  });
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.greeting === "helloTab") sendResponse(sender.tab.id);
});
