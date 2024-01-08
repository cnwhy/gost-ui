import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("climiter");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
    // https://gost.run/concepts/limiter/
    {
      "name": "climiter-0",
      "limits": [
        "$ 1000",
        "$$ 100",
        "192.168.1.1  10"
      ]
    }`,
      },
  ...getOtherAll("climiter", "https://gost.run/concepts/limiter/", {
    redisType: "set",
  }),
] as Template[];
