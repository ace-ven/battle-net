import { compile } from "../helpers/complier";

export function processData(data: any): string {
  // Process the data without stalling the UI
  return data;
}

export const testUserCode = (userSolution: string, challengeData: any) => {
  const {
    functionParams: { value: params },
    ...testCases
  } = challengeData;
  const tests = createTestGroupArray(testCases);
  const results = compile({ params, tests }, userSolution);

  return results;
};

const createTestGroupArray = (tests: any) => {
  return {
    first: [
      { value: decideType(tests.paramA1?.value, tests.typeA1?.value) },
      { value: decideType(tests.paramA2?.value, tests.typeA2?.value) },
      { value: decideType(tests.paramA3?.value, tests.typeA3?.value) },
    ],
    second: [
      { value: decideType(tests.paramB1?.value, tests.typeB1?.value) },
      { value: decideType(tests.paramB2?.value, tests.typeB2?.value) },
      { value: decideType(tests.paramB3?.value, tests.typeB3?.value) },
    ],
    third: [
      { value: decideType(tests.paramC1?.value, tests.paramC1?.value) },
      { value: decideType(tests.paramC2?.value, tests.paramC2?.value) },
      { value: decideType(tests.paramC3?.value, tests.paramC3?.value) },
    ],
  };
};

const decideType = (value: string, type: string) => {
  switch (type) {
    case "string":
      return value;
    case "bool":
      if (value === "true" || value === "1") return true;
      if (value === "false" || value === "0") return false;
    case "int":
      return Number(value);
    case "json":
      return JSON.parse(value);
    default:
      return value;
  }
};
