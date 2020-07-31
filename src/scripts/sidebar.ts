import * as $ from 'jquery';
import URL from './utils/url';

let docUrl = '';
let docStack;

function addSidebar (globalDocStack) {
  docStack = globalDocStack;
  docUrl = top.location.href;
  if (URL.isNote(docUrl)) {
    goBackHome();
    addDocIframe(); // 先这样，后面再去重
  }
}

function removeIframe () {
  let main = $('.app-main.explorer-view')[0].children[1];
  const iframe = document.getElementsByTagName('iframe')[0];
  if (iframe) {
    main.removeChild(iframe);
  }
}

function goBackHome () {
  // If there is a home in history, go back to it
  while (docStack.getDepth()) {
    top.history.back();
    docStack.pop();
  }
  // else create one.
}

function addDocIframe () {
  let explorerView = $('.app-main.explorer-view')[0];

  if (!explorerView) {
    // explorerView is not created yet when dom completed
    setTimeout(addDocIframe, 300);
    return;
  }

  updateLocation();
  let main = explorerView.children[1];

  let doc = document.createElement('iframe'); // not sure
  doc.src = docUrl;
  doc.style.width = '100%';
  doc.style.height = '100%';
  doc.style.border = 'none';
  doc.onload = function() {
    // Inject styles
    var cssLink = document.createElement("link");
    cssLink.href = chrome.extension.getURL('css/content.css');
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    doc.contentWindow.document.head.appendChild(cssLink);
    // Inject scripts
    var script = document.createElement('script');
    script.src = chrome.runtime.getURL('js/autolink.js');
    doc.contentWindow.document.body.appendChild(script);
  }

  for(let child of main.children) {
    child.style.display = 'none';
  }

  main.insertBefore(doc, main.firstElementChild);
}

function updateLocation () {
  top.history.pushState({}, '', docUrl);
  docStack.push();
}

export {
  addSidebar,
  removeIframe
};
