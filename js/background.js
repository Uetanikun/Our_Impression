// Called when the url of a tab changes.
function checkForValidUrl(tabId, changeInfo, tab) {
console.log("checkForValidUrl");
//価格の対象ページか監視
if (tab.url.indexOf("http://kakaku.com/") > -1) {
  if (tab.url.indexOf("itemlist.aspx") > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
}

//トリップの対象ページか監視
if (tab.url.indexOf("http://kakaku.com/") > -1) {
  if (tab.url.indexOf("itemlist.aspx") > -1) {
    // ... show the page action.
    chrome.pageAction.show(tabId);
  }
}
};

// Listen for any changes to the URL of any tab.
chrome.tabs.onUpdated.addListener(checkForValidUrl);