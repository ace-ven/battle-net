import React from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import "brace/mode/html";
import "brace/theme/xcode";
import "brace/snippets/html";
import "brace/ext/language_tools";
// import { stripFunction } from "../../helpers/striper";
// import { validateCodeInsert } from "../../helpers/validators";
import "./IDE.scss";

const IDE = (props: any) => {
  const { visible = true } = props;
  return (
    <div
      className={`ide-container ${props.ideKind} ${
        visible ? "visible" : "hidden"
      } `}
    >
      <AceEditor
        mode={props.mode || "javascript"}
        theme="monokai"
        onChange={(e) => props.updateUserCode(e)}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
        // defaultValue={props.code}
        fontSize={props.fontSize || 14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        // placeholder={props.code}
        value={props.code}
        // value
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{
          backgroundColor: props.bgColor || "#0000001a",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default IDE;
