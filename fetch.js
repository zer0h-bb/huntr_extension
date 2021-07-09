function handleMessage(request, sender, sendResponse) {
	if (request._reward != undefined)
		{
		browser.browserAction.setBadgeText({text: request._reward});
		browser.browserAction.setTitle({title: "Bounty for "+request._url})
	}
  sendResponse({response: "Got reward : "+request._reward});
}

browser.runtime.onMessage.addListener(handleMessage);

browser.browserAction.onClicked.addListener((tab) => {
  browser.tabs.create({url: "https://huntr.dev/bounties/disclose"});
});