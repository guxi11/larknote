import * as $ from 'jquery';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'getPage') {
    $.ajax({
      url: request.url,
      async: true,
      success: function(data) {
        sendResponse({
          status: 'success',
          data,
        })
      },
      error: function(err) {
        sendResponse({
          status: 'fail',
          err,
        })
      }
    });
  }
  // return true to indicate call callback later
  return true;
});
