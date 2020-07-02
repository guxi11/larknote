import * as React from "react"
import * as ReactDOM from "react-dom"

import "./styles/popup.css"

function Hello() {
  return (
    <div className="popup-padded">
      <h1>{ chrome.i18n.getMessage("appName") }</h1>
      <p>{ chrome.i18n.getMessage("appDesc") }</p>
    </div>
  );
}

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
)
