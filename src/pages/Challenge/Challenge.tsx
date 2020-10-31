import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import FileBrowse from "../../components/FileBrowse/FileBrowse";
import IDE from "../../components/IDE/IDE";
import { Tree } from "../../helpers/tree";
import "./challenge.scss";
import { v4 as uuidv4 } from "uuid";
import {
  detectedDrag,
  detectedDragYLeft,
  detectedDragYRight,
} from "../../helpers/dnd";
import {
  RegularBtn,
  ChallengeActionBtn,
} from "../../components/Buttons/Buttons";
import { CheckBox, DropInput } from "../../components/inputs/SwitchInput";
import { connect } from "react-redux";
import { changeTheme } from "../../store/actions/UI.actions";

const Challenge = (props: any) => {
  const [x, setX] = useState(0);
  const [yRight, setYRight] = useState(0);
  const [yLeft, setYLeft] = useState(0);
  const [fileStructure, setFileStructure] = useState([] as any);
  const [tree] = useState(new Tree(""));
  const [logicCode, setLogicCode] = useState({}) as any;
  const [cssCode, setCSSCode] = useState({}) as any;
  const [htmlCode, setHtmlCode] = useState({}) as any;
  const [isAutoPlay, setAutoPlay] = useState(false);
  const [interval, createInterval] = useState(undefined) as any;
  const [fullTXT, setFullTXT] = useState("");
  const rightDivider = useRef(null);
  const leftDivider = useRef(null);
  const mainDivider = useRef(null);

  useEffect(() => {
    props.changeTheme(true);
    setFileStructure([tree.renderMapObj()]);
    handleWindowMovement();
  }, [tree]);

  const handleWindowMovement = () => {
    detectedDrag(mainDivider.current, setX);
    detectedDragYLeft(leftDivider.current, setYLeft);
    detectedDragYRight(rightDivider.current, setYRight);
  };

  const renderResults = () => {
    const html = `${htmlCode?.data || ""} <script type="text/babel">${
      logicCode?.data || ""
    }</script> <style>
    ${cssCode?.data || ""}</style>`;
    debugger;
    if (html !== fullTXT) {
      setFullTXT(html);
      var doc = (document.getElementById("iframe") as any).contentWindow
        .document;
      doc.open();
      doc.write(html);
      doc.close();
    }
  };

  const updateEditorViews = (id: string): void => {
    const node = tree.getNodeById(id);
    if (node) {
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

  const deleteFile = (id: string) => {
    tree.deleteNodeById(id);
    setFileStructure([tree.renderMapObj()]);
  };

  const addNewFile = (id: string, type = "file", lang: string) => {
    tree.addingNodeById(id, uuidv4(), "new file", "", type, lang);
    setFileStructure([tree.renderMapObj()]);
  };

  const updateFileContent = (
    element: any,
    content: string,
    func: any
  ): void => {
    if (element) {
      const newNode = tree.updateNodeContent(element.id, content);
      func(newNode);
    }
  };
  const handleAutoPlayChecked = () => {
    setAutoPlay(!isAutoPlay);
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
          deleteFile={deleteFile}
          renderResults={renderResults}
          setAutoPlay={handleAutoPlayChecked as () => void}
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
              elementId={logicCode?.id}
              code={(logicCode && logicCode.data) || ""}
              updateUserCode={(e: any) =>
                updateFileContent(logicCode, e, setLogicCode)
              }
            />
            <label>JS</label>
          </div>
          <div
            ref={leftDivider}
            className="dividerY"
            id="dividerYLeft"
            // onClick={detectedDrag}
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
              elementId={cssCode?.id}
              code={(cssCode && cssCode.data) || ""}
            />
            <label>CSS</label>
          </div>
        </div>
        <div ref={mainDivider} className="divider" id="divider"></div>
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
              elementId={htmlCode?.id}
              code={(htmlCode && htmlCode.data) || ""}
            />
            <label>HTML</label>
          </div>
          <div ref={rightDivider} className="dividerY" id="dividerYRight"></div>
          <div className="editor-bottom iframe" id={"iframeContainer"}>
            <iframe title={"challenge"} id={"iframe"}></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (dispatch: any) => {
  return {
    changeTheme: (status: boolean) => dispatch(changeTheme(status)),
  };
};

export default connect(null, mapStateToProps)(memo(Challenge));
