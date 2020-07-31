import autoUpdateLinkText from './autolink';
import { addSidebar, removeIframe } from './sidebar';
import DocStack from './DocStack';
import URL from './utils/url';

let docStack = new DocStack;

onPageLoad();

// bindListenerToUrlChange(onPageLoad);

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

function onPageLoad () {
  if (URL.isNote(top.location.href)) {
    // addSidebar(docStack);
    autoUpdateLinkText();
  } else {
    // docStack.clear();
    // removeIframe();
  }
}
