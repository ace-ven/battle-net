import React, { useState } from "react";
import "./styles.scss";

type FileBrowseProps = {
  tree: any;
};

const FileBrowse = (props: FileBrowseProps) => {
  const files = [
    {
      name: "index.js",
      data: "const a = 10",
      id: "1233",
      type: "file",
      root: true,
      children: [],
    },
    {
      name: "src",
      data: "",
      id: "1233",
      type: "folder",
      root: true,
      children: [
        {
          name: "index.js",
          data: "const a = 10",
          id: "1233",
          type: "file",
          children: [],
        },
        {
          name: "index2.js",
          data: "const a = 10",
          id: "1233",
          type: "folder",
          children: [
            {
              name: "index22.js",
              data: "const a = 10",
              id: "1233",
              type: "file",
              children: [],
            },
            {
              name: "index11.js",
              data: "const a = 10",
              id: "1233",
              type: "folder",
              children: [
                {
                  name: "index33.js",
                  data: "const a = 10",
                  id: "1233",
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
      <ListElement element={element} renderFileList={renderFileList} />
    );

    return output;
  };
  return (
    <div>
      <title>FILE BROWSE</title>
      <ul>
        {files
          .sort()
          .reverse()
          .map((element: any) => {
            return renderFileList(element);
          })}
      </ul>
    </div>
  );
};

export default FileBrowse;

const ListElement = (props: any) => {
  const [collapse, setCollapse] = useState(true);
  const { element, renderFileList, root } = props;
  return (
    <li>
      <FileToolbar />
      <div onClick={() => setCollapse(!collapse)} className="list-text-img">
        <span className={`${element.type === "file" ? "file" : "folder"}`} />
        {element.name}
      </div>
      <div
        className="list"
        style={{ display: !root && collapse ? "none" : "block" }}
      >
        {element.children
          .sort()
          .reverse()
          .map((e: any) => renderFileList(e))}
      </div>
    </li>
  );
};

const FileToolbar: any = () => {
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
    >
      {visible ? (
        <div>
          <ul>
            <li>Add new</li>
            <li>Rename</li>
            <li>Delete</li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
