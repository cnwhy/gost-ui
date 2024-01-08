import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("bypasses");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
      // https://gost.run/concepts/bypass/
      {
        "name": "bypass-0",
        "matchers": [
          "127.0.0.1",
          "172.10.0.0/16",
          "localhost",
          "*.example.com",
          ".example.org"
        ]
      }`,
      },
  ...getOtherAll("bypass", "https://gost.run/concepts/bypass/"),
] as Template[];
