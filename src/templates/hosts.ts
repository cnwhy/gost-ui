import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("hosts");
export default [
  def
    ? def
    : {
    label: "内联",
    json: `
      // https://gost.run/concepts/hosts/
      {
        "name": "hosts-0",
        "mappings": [
          {
            "ip": "127.0.0.1",
            "hostname": "example.com"
          },
          {
            "ip": "2001:db8::1",
            "hostname": "example.com"
          }
        ]
      }`,
  },
  ...getOtherAll("hosts", "https://gost.run/concepts/hosts/"),
] as Template[];
