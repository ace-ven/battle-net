import React, { useState } from "react";

import AceEditor from "react-ace";

import "ace-builds/src-noconflict/ext-prompt";
import "ace-builds/src-noconflict/theme-monokai";

import "./IDE.scss";

const TerminalIDE = (props: any) => {
  const [output, setOutput] = useState("");
  const [typing, setTyping] = useState("");

  const renderOutputText = () => {
    const { outputObj } = props;
    const currentOutput =
      outputObj &&
      `you're code results: \n
    code length: ${outputObj.charLength}, \n
    run time duration: ${outputObj.runTime},\n
    code size: ${outputObj.codeSize},\n
    errors: ${outputObj.errors ? outputObj.errors : "No run time errors"},\n
    finale results:${
      outputObj.correct
        ? "You got it right"
        : "Failed, try to insert a correct answer for your new challenge"
    }

    `;
    if (output !== currentOutput) {
      setTyping("");
      setOutput(currentOutput);
    }
  };

  const renderTyping = () => {
    const sourceLength = (output && output.length) || 0;
    let typingLength = (typing && typing.length) || 0;
    if (sourceLength > 0 && sourceLength > typingLength) {
      const currentChars = typing + output[typingLength];
      setTyping(currentChars);
    }
  };
  renderOutputText();
  output &&
    output.length > 0 &&
    setTimeout(() => {
      renderTyping();
    }, 20);

  return (
    <div className={`ide-container ${props.ideKind} typewriter`}>
      <AceEditor
        mode="prompt"
        onChange={() => {}}
        name="UNIQUE_ID_OF_DIV1"
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true
        }}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={typing}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2
        }}
        style={{
          backgroundColor: "#c3c0c0",
          width: "100%",
          height: "100%"
        }}
      />
    </div>
  );
};

export default TerminalIDE;
