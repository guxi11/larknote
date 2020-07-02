import * as $ from 'jquery';

import UnvisitableLinks from './UnvisitableLinks';

const unvisitableLinks = new UnvisitableLinks();

// Auto link
function autoUpdateLinkText () {
  if (location.href.indexOf('docs') >= 0) {
    bindLinkModifyListener();
  }
}

function bindLinkModifyListener () {
  let linkModifyPopup = $(".link-modify-popup")[0];

  if (!linkModifyPopup) {
    // linkModifyPopup is not created yet when dom completed
    setTimeout(bindLinkModifyListener, 300);
    return;
  }

  // The mutation observer
  let ob = new MutationObserver(() => {
    updateLinkText(linkModifyPopup);
  });
  ob.observe(linkModifyPopup, {
    attributes: true,
    attributeFilter: ["class"]
  });
}

// Get link text
function getLinkText (linkInfo: LinkInfo): string  {
  let links = $.map($('a'), link => {
    return {
      href: link.href,
      text: link.text,
      offsetTop: link.offsetTop,
    }
  }).filter(link => link.href === linkInfo.href );

  const mostLikelyOffsetTop = Number(linkInfo.popupOffsetTop.slice(0, -2)) - 21; // remove 'px'
  const mostLikelyLink = links.sort((a, b) => (
    Math.abs(a.offsetTop - mostLikelyOffsetTop) - Math.abs(b.offsetTop - mostLikelyOffsetTop)
  ))[0];

  if (mostLikelyLink.text === mostLikelyLink.href) {
    // in this case, we considered the text is actually empty, just showed as href
    return '';
  }

  return mostLikelyLink.text || '';
}

interface LinkInfo {
  href: string;
  popupOffsetTop: string;
}


// The function to call when the class changes
async function updateLinkText (linkModifyPopup: HTMLElement) {
  const linkHref = $('.link-modify-text')[0].textContent;
  const linkText = getLinkText({
    href: linkHref,
    popupOffsetTop: linkModifyPopup.style.top,
  });

  // Update when popup appears, the link text is empty and the link in not unvisitable
  if (
    linkModifyPopup.className.indexOf('hidden') === -1 &&
    linkText === '' &&
    !unvisitableLinks.has(linkHref)
  ) {
    $('.link-modify-submit')[0].click();
    $('.link-popup')[0].style.visibility = 'hidden';

    let text;
    try {
      text = await getPageTitleByUrl(linkHref);
    } catch (error) {
      unvisitableLinks.add(linkHref);
    }

    $('.link-row-input.text-input')[0].value = text || '';
    $('.link-submit')[0].click();
    $('.link-popup')[0].style.visibility = 'visible';
  }
}

// Get page title
function getPageTitleByUrl (url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ method: 'getPage', url }, function(response) {
      if (response.status === 'success') {
        let matches = response.data.match(/(<title[^>]*>)(.*?)(<\/title>)/);
        resolve(matches[2] || '');
      } else {
        reject(response.err);
      }
    });
  })
}

export default autoUpdateLinkText;
