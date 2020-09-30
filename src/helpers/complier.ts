type testCodeDataType = {
  functionParams: string;
};

export const compile = (data: any, code: string) => {
  try {
    // eslint-disable-next-line no-new-func
    const func: Function = new Function(
      [...data.params.split(",")] as any,
      code as string
    );
    const answerGroup: Array<boolean> = [];
    const result: any = {
      charLength: code.trim().length,
      correct: true,
      errors: "",
      runTime: "0",
      codeSize: "",
      testRes: [],
    };

    Object.keys(data.tests).forEach((key: any, index: number) => {
      const [
        { value: first },
        { value: second },
        { value: desire },
      ] = data.tests[key];
      if (first) {
        try {
          const StartTime = new Date();
          const res = func(first, second);
          const endTime = new Date();
          result.runTime = ` ${new Date(
            (endTime as any) - (StartTime as any)
          ).getMilliseconds()} Milliseconds`;
          if (res === desire) {
            console.log(`case ${index + 1}: Success`);
            answerGroup.push(true);
          } else {
            console.log(`case ${index + 1}: Failed`);
            answerGroup.push(false);
          }
        } catch (err) {
          result.errors += `\n ${err}`;
        }
      }
    });
    console.log("answerGroup", answerGroup);
    result.correct = !answerGroup.filter((a) => a === false).length;
    result.testRes = answerGroup;
    console.log("result", result);
    return result;
  } catch (error) {
    console.log("error", error);
  }
};
