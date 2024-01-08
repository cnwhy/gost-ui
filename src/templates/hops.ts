import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("hops");
export default [
  def
    ? def
    : {
    label: "内联",
    json: `
    // https://gost.run/concepts/hop
    {
      "name": "hop-0",
      "nodes": [
        {
          "name": "node-0",
          "addr": ":8888",
          "connector": {
            "type": "http"
          },
          "dialer": {
            "type": "tcp"
          }
        },
        {
          "name": "node-1",
          "addr": ":9999",
          "connector": {
            "type": "socks5"
          },
          "dialer": {
            "type": "tcp"
          }
        }
      ]
    }`,
  },
  ...getOtherAll("hop", "https://gost.run/concepts/hop"),
] as Template[];
