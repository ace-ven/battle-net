import React, { useState } from "react";
import { ChallengeActionBtn } from "../Buttons/Buttons";
import { CheckBox } from "../inputs/SwitchInput";
import "./styles.scss";

type FileBrowseProps = {
  tree: any;
  updateEditorViews: any;
  handleFileUpdate: any;
  files: Array<any>;
  add: any;
};

const FileBrowse = (props: FileBrowseProps) => {
  const [isCollapse, setCollapse] = useState(false);
  const renderFileList = (element: any) => {
    const output = [];
    output.push(
      <ListElement
        key={element.id}
        element={element}
        updateEditorViews={props.updateEditorViews}
        renderFileList={renderFileList}
        onAdd={props.add}
        handleFileUpdate={props.handleFileUpdate}
      />
    );

    return output;
  };
  return (
    <div className="side-menu">
      <div className={`actions ${isCollapse ? "collapse" : ""}`}>
        <div className="title" onClick={() => setCollapse(!isCollapse)}>
          actions
        </div>
        <div className="btn-container">
          <div className="btn-group">
            <ChallengeActionBtn text={"play"} color={"blue"} fn={() => {}} />
            <CheckBox label={"auto play"} func={() => {}} value={false} />
          </div>
          <ChallengeActionBtn text={"save"} color={"blue"} fn={() => {}} />
          <ChallengeActionBtn
            isBeta={true}
            text={"live"}
            color={"red"}
            fn={() => {}}
          />
          <ChallengeActionBtn isBeta={true} text={"invite"} fn={() => {}} />
        </div>
      </div>
      <div className={`files`}>
        <div className="title">Files Browse</div>
        <ul className="file-view">
          {props.files &&
            props.files.length &&
            props.files
              .sort()
              .reverse()
              .map((element: any) => {
                return renderFileList(element);
              })}
          <FileToolbar
            updateEditorViews={props.updateEditorViews}
            onAdd={props.add}
          />
        </ul>
      </div>
    </div>
  );
};

export default FileBrowse;

const ListElement = (props: any) => {
  const [collapse, setCollapse] = useState(true);
  const { element, renderFileList, root } = props;
  const [name, setName] = useState("") as any;
  const [isRename, setRename] = useState(false) as any;
  if (!element || (Array.isArray(element) && element.length === 0)) {
    return <React.Fragment />;
  }
  const detectedLang = (name: string) => {
    const langList: any = { pg: {}, js: {}, css: {}, html: {} };
    console.log("name", name);
    const parts = name && name.split(".");
    return (
      (langList[parts[parts.length - 1]] && parts[parts.length - 1]) || "txt"
    );
  };

  const handleFileNameChanged = () => {
    setRename(false);
    props.handleFileUpdate(props.element.id, name, detectedLang(name));
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <div className="file-data-element">
      <FileToolbar
        updateEditorViews={props.updateEditorViews}
        elemId={element.id}
        onAdd={props.onAdd}
        elemType={element.type}
        setCollapse={setCollapse}
        setRename={setRename}
      />
      <div onClick={() => setCollapse(!collapse)} className="list-text-img">
        <span
          className={`${
            element.type === "file" ? "file" : "folder"
          } ${detectedLang(name || element.name)}`}
        />
        {isRename ? (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name || element.name}
            onBlur={handleFileNameChanged}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        ) : (
          name || element.name
        )}
      </div>
      <div
        className="list"
        style={{ display: !root && collapse ? "none" : "block" }}
      >
        {element.children &&
          element.children
            .sort()
            .reverse()
            .map((e: any) => renderFileList(e))}
      </div>
    </div>
  );
};

const FileToolbar: any = (props: any) => {
  const [visible, setVisible] = useState(false);

  const handleFileAction = (
    type?: string | undefined,
    lang?: string | undefined
  ) => {
    setVisible(false);
    props.setCollapse(false);
    props.onAdd(props.elemId, type, lang);
  };
  return (
    <div
      className={`toolbar-container ${visible ? "visible" : ""}`}
      onContextMenu={(event) => {
        event.preventDefault();
        setVisible(true);
      }}
      onBlur={() => setVisible(false)}
      tabIndex={12}
      onClick={() => {
        props.updateEditorViews(props.elemId);
      }}
    >
      {visible ? (
        <ul>
          {props.elemType !== "file" ? (
            <React.Fragment>
              <li onClick={() => handleFileAction(undefined, "js")}>
                Add new JS File
              </li>
              <li onClick={() => handleFileAction(undefined, "html")}>
                Add new HTML File
              </li>
              <li onClick={() => handleFileAction(undefined, "css")}>
                Add new CSS File
              </li>

              <li onClick={() => handleFileAction("folder")}>Add new Folder</li>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}

          <li
            onClick={() => {
              setVisible(false);
              props.setRename(true);
            }}
          >
            Rename
          </li>
          <li>Delete</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
