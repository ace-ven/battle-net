export const stripFunction = (funcStr: String) => {
  return funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
};

export const validateUserCode = (
  formCode: String,
  userCode: String,
  fullStr: String
) => {
  const stripCode = stripFunction(userCode);
  const str = userCode.replace(stripCode, "\n      \n    ");
  const res = str
    .replace(/(↵)|\w+(↵)/g, "")
    .includes(formCode.replace(/(↵)|\w+(↵)/g, ""));

  if (!res) {
    return { status: false, msg: "You Can not change the main function props" };
  }

  if (res) {
    const index = fullStr.lastIndexOf("}");
    if (fullStr[index + 1] !== undefined) {
      return {
        status: false,
        msg: "Keep your code inside the main function block"
      };
    }
  }
  return {
    status: true,
    msg: ""
  };
};

export const validateV2 = (userCode: String, intialCode: String) => {
  const codeStriped = stripFunction(userCode);
  const t = userCode.replace(codeStriped, "\n\n\n   ");
  if (t == intialCode) {
    return {
      status: true,
      msg: ""
    };
  }
  return { status: false, msg: "You Can not change the main function props" };
};
