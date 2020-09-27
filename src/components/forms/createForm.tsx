import React, { memo, useEffect, useState } from "react";
import { TextInput, DropInput, SwitchInput } from "../inputs/SwitchInput";
import formSchema from "./newChallengeSchema.json";
import "./forms.scss";
import IDE from "../IDE/IDE";
import RegularBtn from "../Buttons/Buttons";
import { Resizable } from "re-resizable";
import { parseSecondToMin } from "../../helpers/timer";

type inputParams = {
  display: string;
  type: string;
  value: string;
  name: string;
};

const CreateForm = () => {
  const [formState, setFormState] = useState({ ...formSchema });
  const [ideStr, setIdeStr] = useState("");
  const handleChange = (event: any) => {
    const newState = { ...formState };
    (newState as any)[`${event.target.name}`].value = event.target.value;
    setFormState({ ...newState });
  };

  useEffect(() => {
    createIdeContent();
  }, [formState]);

  const handleSwitch = (type: string, field: string) => {
    const current = (formState as any)[field] as inputParams;
    current.value = type;
    setFormState({ ...formState, ...current });
  };

  const renderTestGroups = () => {
    const testGroupParams = [
      "paramA1",
      "paramA2",
      "desireA",
      "paramB1",
      "paramB2",
      "desireB",
      "paramC1",
      "paramC2",
      "desireC",
    ];
    return testGroupParams.map((group) => {
      const currentType = group.replace("param", "type");
      return (
        <div className="params-input">
          {renderInputs([group])}
          <div className="group-switch">
            <SwitchInput
              onSwitch={() => handleSwitch("string", currentType)}
              bgColor={"danger"}
              active={
                ((formState as any)[currentType] as inputParams).value ===
                "string"
              }
              label={"string"}
            />
            <SwitchInput
              onSwitch={() => handleSwitch("bool", currentType)}
              bgColor={"regular"}
              active={
                ((formState as any)[currentType] as inputParams).value ===
                "bool"
              }
              label={"bool"}
            />
            <SwitchInput
              onSwitch={() => handleSwitch("int", currentType)}
              bgColor={"primary"}
              active={
                ((formState as any)[currentType] as inputParams).value === "int"
              }
              label={"int"}
            />
            <SwitchInput
              onSwitch={() => handleSwitch("json", currentType)}
              bgColor={"alert"}
              active={
                ((formState as any)[currentType] as inputParams).value ===
                "json"
              }
              label={"json"}
            />
          </div>
        </div>
      );
    });
  };

  const createIdeContent = () => {
    const {
      challengeName: { value: name },
      description: { value: desc },
      duration: { value: time },
      functionParams: { value: params },
    } = formState;

    const outputStr: string = `\n\n//${desc}\n//You got ${parseSecondToMin(
      time
    )} for complete this challenge \nfunction ${name}(${params}){\n\n}`;
    setIdeStr(outputStr);
  };

  const renderInputs = (fields: Array<String>) => {
    const currentState = formState as any;

    return fields.map((field: any) => {
      if (currentState[field].type !== "ddl")
        return (
          <TextInput
            key={field}
            label={currentState[field].display}
            active={false}
            name={currentState[field].name}
            value={currentState[field].value}
            change={handleChange}
            type={currentState[field].type}
          />
        );

      return (
        <DropInput
          key={field}
          label={currentState[field].display}
          active={false}
          name={currentState[field].name}
          value={currentState[field].value}
          change={handleChange}
          type={currentState[field].type}
          options={["Number", "Text", "Boolean"]}
        />
      );
    });
  };
  console.log("form.state", formState);
  return (
    <form>
      <h2 style={{ fontFamily: "Baloo-bold" }}>Basic Information</h2>
      <div className="group">
        {renderInputs(["challengeName", "description"])}
      </div>
      <div className="group">
        {renderInputs(["difficultly", "duration", "functionParams"])}
      </div>
      <div style={{ marginTop: "75px" }}>
        <h2 style={{ fontFamily: "Baloo-bold" }}>Test Cases</h2>
        <div className="test-group-container">{renderTestGroups()}</div>
      </div>
      <div className="navigate-down">
        <div className="continue-btn">
          <label>continue</label>
          <div className="line"></div>
          <a href={"#code-section"}> </a>
        </div>
      </div>
      <div id="code-section">
        <h2 style={{ fontFamily: "Baloo-bold" }}>You're Solution </h2>
        <div className="create-ide">
          <IDE ideKind={"code"} code={ideStr} />
          <div
            style={{
              position: "absolute",
              height: "200px",
              bottom: 0,
              left: 0,
              right: 0,
            }}
          >
            <Resizable
              defaultSize={{ width: "100%", height: "100%" }}
              style={{
                position: "absolute",
                height: "200px",
                bottom: 0,
                left: 0,
                right: 0,
              }}
            >
              <IDE ideKind={"terminal"} />
            </Resizable>
          </div>
        </div>
        <div className="ide-btn-action">
          <div>
            <RegularBtn
              text={"Test Code"}
              rounded={true}
              fn={() => {}}
              color={"#ff5722"}
            />
            <RegularBtn
              text={"Clear Code"}
              rounded={true}
              fn={() => {}}
              color={"orange"}
              borderColor={"orange"}
              borderWidth={"2px"}
            />
          </div>
          <RegularBtn
            text={"Submit"}
            rounded={true}
            fn={() => {}}
            color={"white"}
            borderColor={"red"}
            borderWidth={"0px"}
            fill={"orange"}
          />
        </div>
      </div>
    </form>
  );
};

export default memo(CreateForm);
