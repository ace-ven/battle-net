import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import "brace/mode/html";
import "brace/theme/xcode";
import "brace/snippets/html";
import "brace/ext/language_tools";
import "./IDE.scss";

type battleIDEProps = {
  challengeStr: string;
  onSubmit?: (challengeCode: String) => Promise<any>;
  onTest?: (challengeCode: String) => Promise<any>;
  onUpdate?: (userAnswer: string) => any;
};

const BattleIDE = (props: battleIDEProps) => {
  const [code, setCode] = useState("");
  const { challengeStr } = props;

  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      onChange={props.onUpdate}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{
        $blockScrolling: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      }}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={challengeStr}
      // value
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2
      }}
      style={{
        backgroundColor: "#0000001a",
        width: "100%",
        height: "100%"
      }}
    />
  );
};

export default BattleIDE;
