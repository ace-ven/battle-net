// import React from "react";
// import AceEditor from "react-ace";

// import "ace-builds/src-noconflict/mode-javascript";
// import "ace-builds/src-noconflict/theme-monokai";

// import "brace/mode/html";
// import "brace/theme/xcode";
// import "brace/snippets/html";
// import "brace/ext/language_tools";
// // import { stripFunction } from "../../helpers/striper";
// // import { validateCodeInsert } from "../../helpers/validators";
// import "./IDE.scss";

// class IDE extends React.Component<any, any> {
//   state = {
//     code: "",
//   };
//   updateCode = (outputStr?: any) => {
//     const { code } = this.state;
//     // const { valid } = validateCodeInsert(
//     //   code.replace(stripFunction(outputStr), "\n\n\n  "),
//     //   code
//     // );
//     // if (valid) {
//     //   const newIdeState = { ...this.state };
//     //   newIdeState.code = `${outputStr}`;
//     //   this.setState({ ...newIdeState });
//     // }
//     // if (!valid) {
//     //   this.setState(() => ({ code: this.state.code }));
//     // }
//   };

//   shouldComponentUpdate(nextProps: any, nextState: any) {
//     if (nextProps !== this.props) {
//       if (this.props.isTesting !== nextProps.isTesting && nextProps.isTesting) {
//         this.props.testUserCode(this.state.code);
//         return true;
//       }
//       if (nextProps.step === 2) {
//         this.setState(() => ({ code: this.props.codeStr }));
//         return true;
//       }

//       if (nextProps.step === 1 && this.props.step === 2) {
//         // this.props.updateUserAnswer(stripFunction(this.state.code));
//         return true;
//       }
//       return true;
//     } else if (this.state !== nextState) {
//       if (this.state.code) {
//         return false;
//       }

//       return true;
//     }
//     return false;
//   }

//   render() {
//     return (
//       <div className={`ide-container ${this.props.ideKind}`}>
//         <AceEditor
//           mode="javascript"
//           theme="monokai"
//           onChange={this.updateCode}
//           name="UNIQUE_ID_OF_DIV"
//           editorProps={{
//             $blockScrolling: true,
//             enableBasicAutocompletion: true,
//             enableLiveAutocompletion: true,
//           }}
//           fontSize={14}
//           showPrintMargin={true}
//           showGutter={true}
//           highlightActiveLine={true}
//           value={`${
//             this.props.step === 2 ? this.state.code : this.props.codeStr
//           }`}
//           // value
//           setOptions={{
//             enableBasicAutocompletion: true,
//             enableLiveAutocompletion: true,
//             enableSnippets: true,
//             showLineNumbers: true,
//             tabSize: 2,
//           }}
//           style={{
//             backgroundColor: "#0000001a",
//             width: "100%",
//             height: "100%",
//           }}
//         />
//       </div>
//     );
//   }
// }

// export default IDE;

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
  console.log(props);
  return (
    <div className={`ide-container ${props.ideKind}`}>
      <AceEditor
        mode="javascript"
        theme="monokai"
        // onChange={this.updateCode}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{
          $blockScrolling: true,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
        defaultValue={props.code}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
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
          backgroundColor: "#0000001a",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default IDE;
