import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("routers");
export default [
  def
    ? def
    : {
    label: "内联",
    json: `
      // https://gost.run/concepts/router/
      {
        "name": "router-0",
        "routes": [
          {
            "net": "192.168.1.0/24",
            "gateway": "192.168.123.2"
          },
          {
            "net": "172.10.0.0/16",
            "gateway": "192.168.123.3"
          }
        ]
      }`,
  },
  ...getOtherAll("router", "https://gost.run/concepts/router/"),
] as Template[];
