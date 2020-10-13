import React, { useState } from "react";
import "./styles.scss";

type FileBrowseProps = {
  tree: any;
  updateEditorViews: any;
  files: Array<any>;
  add: any;
};

const FileBrowse = (props: FileBrowseProps) => {
  const files = [
    {
      name: "index.js",
      data: "const a = 10",
      id: "1",
      type: "file",
      root: true,
      children: [],
    },
    {
      name: "src",
      data: "",
      id: "2",
      type: "folder",
      root: true,
      children: [
        {
          name: "index.js",
          data: "const a = 10",
          id: "3",
          type: "file",
          children: [],
        },
        {
          name: "index2.js",
          data: "const a = 10",
          id: "4",
          type: "folder",
          children: [
            {
              name: "index22.js",
              data: "const a = 10",
              id: "5",
              type: "file",
              children: [],
            },
            {
              name: "index11.js",
              data: "const a = 10",
              id: "6",
              type: "folder",
              children: [
                {
                  name: "index33.js",
                  data: "const a = 10",
                  id: "7",
                  type: "file",
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const renderFileList = (element: any) => {
    const output = [];
    output.push(
      <ListElement
        element={element}
        updateEditorViews={props.updateEditorViews}
        renderFileList={renderFileList}
        onAdd={props.add}
      />
    );

    return output;
  };
  return (
    <div>
      <title>FILE BROWSE</title>
      <ul>
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
          //   elemId={element.id}
          onAdd={props.add}
          //   elemType={element.type}
        />
      </ul>
    </div>
  );
};

export default FileBrowse;

const ListElement = (props: any) => {
  const [collapse, setCollapse] = useState(true);
  const { element, renderFileList, root } = props;
  const { name, setName } = useState("") as any;
  if (!element || (Array.isArray(element) && element.length === 0)) {
    return <React.Fragment />;
  }
  return (
    <li>
      <div onClick={() => setCollapse(!collapse)} className="list-text-img">
        <FileToolbar
          updateEditorViews={props.updateEditorViews}
          elemId={element.id}
          onAdd={props.onAdd}
          elemType={element.type}
        />
        <span className={`${element.type === "file" ? "file" : "folder"}`} />

        <input type={"text"} value={name || element.name} />
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
    </li>
  );
};

const FileToolbar: any = (props: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={`toolbar-container ${visible ? "visible" : ""}`}
      onContextMenu={(event) => {
        event.preventDefault();
        setVisible(true);
      }}
      onBlur={() => setVisible(false)}
      tabIndex={1}
      onClick={() => {
        console.log("click");
        props.updateEditorViews(props.elemId);
      }}
    >
      {visible ? (
        <ul>
          {props.elemType !== "file" ? (
            <React.Fragment>
              <li onClick={() => props.onAdd(props.elemId)}>Add new File</li>
              <li onClick={() => props.onAdd(props.elemId, "folder")}>
                Add new Folder
              </li>
            </React.Fragment>
          ) : (
            <React.Fragment />
          )}

          <li>Rename</li>
          <li>Delete</li>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};
