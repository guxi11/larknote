import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";
import { Switch } from 'antd';

import 'antd/dist/antd.css';
import "./styles/popup.css";

function Popup() {
  const [autoLink, setAutoLink] = useState(true);
  const [autoLinkLoading, setAutoLinkLoading] = useState(true);
  const [autoLinkGetLoading, setAutoLinkGetLoading] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(['autoLink'], function(result) {
      const { autoLink } = result;
      console.log('Value currently is ' + autoLink);
      if (typeof autoLink === 'boolean') { // saved in the storage
        setAutoLink(autoLink);
      }
      setAutoLinkLoading(false);
      setAutoLinkGetLoading(false);
    });
  }, []);

  const switchAutoLink = () => {
    setAutoLinkLoading(true);

    // popup ---> content
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, (tabs) => {
      let message = {
        info: autoLink ? 'turn off autolink' : 'turn on autolink',
      }
      chrome.tabs.sendMessage(tabs[0].id, message, () => {
        const autoLinkStatus = !autoLink;

        setAutoLink(autoLinkStatus);
        setAutoLinkLoading(false);

        chrome.storage.sync.set({ autoLink: autoLinkStatus }, function() {
          console.log('Value is set to ' + autoLinkStatus);
        });
      })
    })
  };

  return (
    <div className="popup">
      <div className="body">
        {/* <h2>{ chrome.i18n.getMessage("appName") }</h2> */}
        {/* <p>{ chrome.i18n.getMessage("appDesc") }</p> */}
        <div className="title">Features:</div>
        <div className="options">
          <div className="option">
            <div className="label">Auto-complete Link Text</div>
            {!autoLinkGetLoading && (
            <Switch
              className="switch"
              loading={autoLinkLoading}
              checkedChildren="ON"
              unCheckedChildren="OFF"
              checked={autoLink}
              onClick={switchAutoLink}
            />
            )}
          </div>
        </div>
      </div>
      <div className="footer">
        © 2020 Guxi11 -
        <a className="a" target='_blank' href="https://chrome.google.com/webstore/detail/larknote/icjjpnmgiofpnnfpjpbjmfjnaokcdmpi"> Larknote</a>
      </div>
    </div>
  );
}

ReactDOM.render(
  <Popup />,
  document.getElementById('root')
)
