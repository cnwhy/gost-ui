import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("limiters");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
    // https://gost.run/concepts/limiter/
    {
      "name": "limiter-0",
      "limits": [
        "$ 100MB 100MB",
        "$$ 10MB",
        "192.168.1.1  512KB 1MB",
        "192.168.0.0/16  1MB  5MB"
      ]
    }`,
      },
  ...getOtherAll("limiters", "https://gost.run/concepts/limiter/", {
    redisType: "set",
  }),
] as Template[];
