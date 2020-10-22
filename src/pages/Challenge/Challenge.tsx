import { Resizable } from "re-resizable";
import React, { useEffect, useState } from "react";
import FileBrowse from "../../components/FileBrowse/FileBrowse";
import IDE from "../../components/IDE/IDE";
import { Node, Tree } from "../../helpers/tree";
import "./challenge.scss";
import { v4 as uuidv4 } from "uuid";

const Challenge = () => {
  const [htmlStr, setHtmlStr] = useState("");
  const [jsStr, setJsStr] = useState("");
  const [css, setCssStr] = useState("");
  const [x, setX] = useState(0);
  const [yRight, setYRight] = useState(0);
  const [yLeft, setYLeft] = useState(0);
  const [fileStructure, setFileStructure] = useState([] as any);
  const [tree, setTree] = useState(new Tree(""));
  const [logicCode, setLogicCode] = useState(undefined) as any;
  const [cssCode, setCSSCode] = useState(undefined) as any;
  const [htmlCode, setHtmlCode] = useState(undefined) as any;

  useEffect(() => {
    setFileStructure([tree.renderMapObj()]);
  }, []);

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
      console.log("elmnt.style.left", elmnt.style.left);
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

  const updateEditorViews = (id: string) => {
    const node = tree.getNodeById(id);
    if (node) {
      console.log("ssss", node);
      if (node.lang === "html") {
        setHtmlCode(node);
        return;
      }
      if (node.lang === "css") {
        setCSSCode(node);
        return;
      }

      if (node.lang === "js") {
        setLogicCode(node);
        return;
      } else {
        setLogicCode(node);
      }
      return;
    }
    return;
  };

  const handleFileUpdate = (id: string, name: string, lang: string) => {
    tree.updateNodeName(id, name, lang);
  };

  const addNewFile = (id: string, type = "file", lang: string) => {
    console.log("name lang", lang);
    tree.addingNodeById(id, uuidv4(), "new file", "sdfkhsndfks", type, lang);
    setFileStructure([tree.renderMapObj()]);
  };

  const updateEditorView = (id: string) => {
    // const node = tree.getNodeById(id);
    // if (node.lang === "html") {
    //   setHtmlCode(node.data);
    // }
    // if (node.lang === "css") {
    //   setCSSCode(node.data);
    // }
    // if (node.lang === "js") {
    //   setLogicCode(node.data);
    // }
    // setLogicCode(node.data);
    // return;
  };

  const updateFileContent = (element: any, content: string, fuc: any) => {
    console.log("sdfsdfsd---", element);
    const newNode = tree.updateNodeContent(element.id, content);
    fuc(newNode);
  };

  return (
    <>
      <div className="file-browse">
        <FileBrowse
          tree={[]}
          files={fileStructure}
          updateEditorViews={updateEditorViews}
          add={addNewFile}
          handleFileUpdate={handleFileUpdate}
          updateEditorView={updateEditorView}
        />
      </div>
      <div className="challenge-container" style={{ left: "150px" }}>
        <div className="left" style={{ width: x ? `${x - 150}px` : "" }}>
          <div
            className="editor-top"
            style={{ height: yLeft ? `${yLeft}` : "" }}
          >
            <IDE
              ideKind={"code"}
              visible={true}
              bgColor={"#1f2227"}
              fontSize="10px"
              code={(logicCode && logicCode.data) || ""}
              updateUserCode={(e: any) =>
                updateFileContent(logicCode, e, setJsStr)
              }
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
              updateUserCode={(e: any) =>
                updateFileContent(cssCode, e, setCSSCode)
              }
              bgColor={"#1f2227"}
              mode={"css"}
              fontSize="10px"
              code={(cssCode && cssCode.data) || ""}
            />
            <label>CSS</label>
          </div>
        </div>
        <div className="divider" id="divider" onClick={detectedDrag}></div>
        <div
          className="right"
          style={{ width: x ? `calc(100% - (${x}px - 150px)` : "" }}
        >
          <div
            className="editor-top"
            style={{ height: yRight ? `${yRight}` : "" }}
          >
            <IDE
              ideKind={"code"}
              visible={true}
              updateUserCode={(e: any) =>
                updateFileContent(htmlCode, e, setHtmlCode)
              }
              bgColor={"#1f2227"}
              mode={"html"}
              fontSize="10px"
              code={(htmlCode && htmlCode.data) || ""}
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
    </>
  );
};

export default Challenge;
