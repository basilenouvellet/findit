// Message Listener

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.getParas) { getParasHandler(sendResponse); }
});


// Handlers

function getParasHandler(sendResponse: { (response?: any): void; (arg0: { paras: HTMLCollectionOf<HTMLParagraphElement>; }): void; }) {
    const paras = document.getElementsByTagName('p');
    console.log('[contentscript.js] paras', paras);

    sendResponse({ paras: Array.from(paras, x => x.innerText) });
}
