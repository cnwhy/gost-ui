import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("admissions");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
      // https://gost.run/concepts/admission
      {
        "name": "admission-0",
        "matchers": [
          "127.0.0.1",
          "192.168.0.0/16",
          "example.com"
        ]
      }`,
      },
  ...getOtherAll("admission", "https://gost.run/concepts/admission"),
] as Template[];
