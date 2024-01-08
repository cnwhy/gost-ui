import { getByName } from "./default";
import { Template } from "./type";

const def = getByName("resolvers");
export default [
  def,
//   {
//     label: "默认",
//     json: `
//     // https://gost.run/concepts/resolver/
//     {
//         "name": "resolver-0",
//         "nameservers": [
//           {
//             "addr": "1.1.1.1"
//           },
//           {
//             "addr": "tcp://8.8.8.8"
//           },
//           {
//             "addr": "tls://8.8.8.8:853"
//           },
//           {
//             "addr": "https://1.0.0.1/dns-query"
//           }
//         ]
//       }`,
//   },
//   {
//     label: "使用转发链",
//     json: `
//     // https://gost.run/concepts/resolver/
//     {
//         "name": "resolver-0",
//         "nameservers": [
//           {
//             "addr": "1.1.1.1"
//           },
//           {
//             "addr": "tcp://8.8.8.8:53",
//             "chain": "chain-0"
//           },
//           {
//             "addr": "tls://8.8.8.8:853",
//             "chain": "chain-1"
//           },
//           {
//             "addr": "https://1.0.0.1/dns-query",
//             "chain": "chain-2"
//           }
//         ]
//       }`,
//   },
] as Template[];
