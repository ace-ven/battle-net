import { Resizable } from "re-resizable";
import React, { useState } from "react";
import IDE from "../../components/IDE/IDE";
import "./challenge.scss";

const Challenge = () => {
  const [htmlStr, setHtmlStr] = useState("");
  const [jsStr, setJsStr] = useState("");
  const [css, setCssStr] = useState("");
  const [x, setX] = useState(0);
  const [yRight, setYRight] = useState(0);
  const [yLeft, setYLeft] = useState(0);

  const renderResults = () => {
    const html = `${htmlStr} <script type="text/babel">${jsStr}</script> <style>${css}</style>`;
    var doc = (document.getElementById("iframe") as any).contentWindow.document;
    console.log("html", html);
    doc.open();
    doc.write(html);
    doc.close();
  };
  setTimeout(() => {
    renderResults();
  }, 1000);

  const detectedDrag = (elmnt: any) => {
    var pos1 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      (document.getElementById(
        elmnt.id + "header"
      ) as any).onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      console.log("e", e);
      pos1 = pos3 - e.clientX;
      pos3 = e.clientX;
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      setX(e.clientX);
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };

  const detectedDragYRight = (elmnt: any) => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      (document.getElementById(
        elmnt.id + "header"
      ) as any).onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      console.log("e", e);
      pos2 = pos4 - e.clientY;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      setYRight(elmnt.style.top);
      (document.getElementById("iframeContainer") as any).style.zIndex = -1;
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
      (document.getElementById("iframeContainer") as any).style.zIndex = 0;
    }
  };

  const detectedDragYLeft = (elmnt: any) => {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      (document.getElementById(
        elmnt.id + "header"
      ) as any).onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e: any) {
      e = e || window.event;
      e.preventDefault();
      console.log("e", e);
      pos2 = pos4 - e.clientY;
      pos4 = e.clientY;
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      setYLeft(elmnt.style.top);
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };
  setTimeout(() => {
    detectedDrag(document.getElementById("divider") as any);
    detectedDragYLeft(document.getElementById("dividerYLeft") as any);
    detectedDragYRight(document.getElementById("dividerYRight") as any);
  }, 1000);

  setTimeout(() => {}, 1000);

  console.log(yRight);

  return (
    <div className="challenge-container">
      <div className="left" style={{ width: x ? `${x}px` : "" }}>
        <div className="editor-top" style={{ height: yLeft ? `${yLeft}` : "" }}>
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setJsStr}
            bgColor={"#1f2227"}
            fontSize="10px"
          />
          <label>JS</label>
        </div>
        <div
          className="dividerY"
          id="dividerYLeft"
          onClick={detectedDrag}
        ></div>
        <div className="editor-bottom">
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setCssStr}
            bgColor={"#1f2227"}
            mode={"css"}
            fontSize="10px"
          />
          <label>CSS</label>
        </div>
      </div>
      <div className="divider" id="divider" onClick={detectedDrag}></div>
      <div className="right" style={{ width: x ? `calc(100% - ${x}px)` : "" }}>
        <div
          className="editor-top"
          style={{ height: yRight ? `${yRight}` : "" }}
        >
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setHtmlStr}
            bgColor={"#1f2227"}
            mode={"html"}
            fontSize="10px"
          />
          <label>HTML</label>
        </div>
        <div
          className="dividerY"
          id="dividerYRight"
          onClick={detectedDrag}
        ></div>
        <div className="editor-bottom iframe" id={"iframeContainer"}>
          <iframe id={"iframe"}></iframe>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
