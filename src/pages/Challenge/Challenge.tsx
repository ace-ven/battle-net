import { Resizable } from "re-resizable";
import React, { useState } from "react";
import IDE from "../../components/IDE/IDE";
import "./challenge.scss";

const Challenge = () => {
  const [htmlStr, setHtmlStr] = useState("");
  const [jsStr, setJsStr] = useState("");
  const [css, setCssStr] = useState("");

  const renderResults = () => {
    const html = `${htmlStr} <script>${jsStr}</script> <style>${css}</style>`;
    var doc = (document.getElementById("iframe") as any).contentWindow.document;
    doc.open();
    doc.write(html);
    doc.close();
  };
  setTimeout(() => {
    renderResults();
  }, 1000);
  return (
    <div className="challenge-container">
      <div className="left">
        <Resizable
          defaultSize={{ width: "100%", height: "50%" }}
          style={{
            position: "absolute",
            height: "100px",
            top: 0,
            left: 0,
            // right: 0,
          }}
        >
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setJsStr}
            bgColor={"#171d20"}
          />
        </Resizable>
        <Resizable
          defaultSize={{ width: "100%", height: "50%" }}
          style={{
            position: "absolute",
            height: "100px",
            bottom: 0,
            right: 0,
          }}
        >
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setCssStr}
            bgColor={"#060918"}
            mode={"css"}
          />
        </Resizable>
      </div>
      <div className="right">
        <Resizable
          defaultSize={{ width: "100%", height: "50%" }}
          style={{
            position: "absolute",
            height: "100px",
            top: 0,
            right: 0,
          }}
        >
          <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={setHtmlStr}
            bgColor={"#000b14"}
            mode={"html"}
          />
        </Resizable>
        <Resizable
          defaultSize={{ width: "100%", height: "50%" }}
          style={{
            position: "absolute",
            height: "100px",
            bottom: 0,
            right: 0,
          }}
        >
          {/* <IDE
            ideKind={"code"}
            visible={true}
            updateUserCode={() => {}}
            bgColor={"#060918"}
            mode={"html"}
          /> */}
          <iframe
            style={{ position: "absolute", height: "100%", width: "100%" }}
            id={"iframe"}
          ></iframe>
        </Resizable>
      </div>
    </div>
  );
};

export default Challenge;
