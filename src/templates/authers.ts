import { getByName } from "./default";
import { getOtherAll } from "./otherOrigin";
import { Template } from "./type";

const def = getByName("authers");
export default [
  def
    ? def
    : {
        label: "内联",
        json: `
    // https://gost.run/concepts/auth
    {
      "name": "auther-0",
      "auths": [
        {
          "username": "user1",
          "password": "pass1"
        },
        {
          "username": "user2",
          "password": "pass2"
        }
      ]
    }`,
      },
  ...getOtherAll("auther", "https://gost.run/concepts/auth"),
] as Template[];
