import { autoCompleteLinkText, removeAutoCompleteLinkText } from './autolink';
import { addSidebar, removeIframe } from './sidebar';
import DocStack from './DocStack';
import URL from './utils/url';

const MSG = {
  TURN_ON_AUTOLINK: 'turn on autolink',
  TURN_OFF_AUTOLINK: 'turn off autolink',
}

let docStack = new DocStack;

// on page load
onPageLoad();
// bindListenerToUrlChange(onPageLoad);

function onPageLoad () {
  if (URL.isNote(top.location.href)) {
    // addSidebar(docStack);

    chrome.storage.sync.get(['autoLink'], function(result) {
      const { autoLink } = result;
      console.log('Value currently is ' + autoLink);
      console.log(autoLink);
      if ((autoLink === undefined || typeof autoLink === 'boolean' && autoLink)) { // saved in the storage
        autoCompleteLinkText();
      }
    });
  } else {
    // docStack.clear();
    // removeIframe();
  }
}

function bindListenerToUrlChange (listener) {
  let oldUrl = top.location.href;
  window.addEventListener('click', () => {
    const newUrl = top.location.href;
    if (oldUrl !== newUrl) {
      if (URL.isNote(newUrl)) {
        docStack.push();
      }
      listener();
    }
    oldUrl = newUrl;
  })
}

// get messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.info === MSG.TURN_ON_AUTOLINK) {
    autoCompleteLinkText();
    sendResponse('added')
  } else {
    removeAutoCompleteLinkText();
    sendResponse('removed')
  }
})
