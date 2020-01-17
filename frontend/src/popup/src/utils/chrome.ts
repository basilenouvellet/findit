function sendMessageToContentScript(msg: object, callback?: (response: any) => any) {
    chrome.tabs.query({ active:true, currentWindow: true }, tabs => {
      if (tabs && tabs.length && tabs[0].id) {
        chrome.tabs.sendMessage(tabs[0].id, msg, callback);
      }
    });
  };

export { sendMessageToContentScript };
