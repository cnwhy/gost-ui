import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("rlimiter");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
    // https://gost.run/concepts/limiter/
    {
      "name": "rlimiter-0",
      "limits": [
        "$ 100",
        "$$ 10",
        "192.168.1.1  50",
        "192.168.0.0/16  5"
      ]
    }`,
      },
  ...getOtherAll("rlimiter", "https://gost.run/concepts/limiter/", {
    redisType: "set",
  }),
] as Template[];
