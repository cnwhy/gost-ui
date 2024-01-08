import * as JSONC from "jsonc-parser";
import { getByName } from "./default";
import { Template } from "./type";

const getProxyJson = (
  handlerType: string,
  listenerType: string,
  metadata?: object
) => {
  let jsonc = `
  {
    "name": "service-0",
    "addr": ":1080",
    "handler": {
      "type": "${handlerType}",
      // "auth": {
      //   "username": "user",
      //   "password": "password"
      // }
    },
    "listener": {
      "type": "${listenerType}"
    }
  }`;
  if (metadata) {
    const edits = JSONC.modify(jsonc, ["metadata"], metadata, {});
    edits.push(...JSONC.modify(jsonc, ["handler", "metadata"], metadata, {}));
    edits.push(...JSONC.modify(jsonc, ["listener", "metadata"], metadata, {}));
    // edits.push(...JSONC.modify(jsonc, ["name"], undefined, {})) // undefined 可删除
    jsonc = JSONC.applyEdits(jsonc, edits);
    // jsonc = JSONC.applyEdits(
    //   jsonc,
    //   JSONC.modify(jsonc, ["metadata"], metadata, {})
    // );
    // jsonc = JSONC.applyEdits(
    //   jsonc,
    //   JSONC.modify(jsonc, ["handler","metadata"], metadata, {})
    // );
    // jsonc = JSONC.applyEdits(
    //   jsonc,
    //   JSONC.modify(jsonc, ["listener","metadata"], metadata, {})
    // );
  }

  return jsonc;
};

const def = getByName("services");

export default [
  def,
  {
    label: "端口转发",
    cli: "-L tcp://:80/:8080",
    json: `
      {
        "name": "service-0", // 服务名称
        "addr": ":80",
        "handler": {
          "type": "tcp"
        },
        "listener": {
          "type": "tcp"
        },
        "forwarder": {
          "nodes": [
            {
              "name": "target-0",
              "addr": ":8080"
            }
          ]
        }
      }`,
  },
  {
    label: "反向代理",
    cli: "",
    json: `
      {
        "name": "service-0",
        "addr": ":80",
        "handler": {
            "type": "tcp",
            "metadata": {
                "sniffing": "true"
            }
        },
        "listener": {
            "type": "tcp"
        },
        "forwarder": {
            "nodes": [
                {
                    "name": "target-1",
                    "addr": "www.baidu.com:80",
                    // "host": "myhost.com",
                    // "path": "/"
                    "http": {
                        "host": "www.baidu.com"
                    }
                }
            ]
        }
      }`,
  },
  {
    label: "代理服务",
    children: [
      {
        label: "http",
        children: [
          {
            label: "http",
            json: getProxyJson("http", "tcp"),
          },
          {
            label: "https(http+tsl)",
            json: getProxyJson("http", "tls"),
          },
          {
            label: "http+wss",
            json: getProxyJson("http", "wss"),
          },
          {
            label: "http2",
            json: getProxyJson("http2", "http2"),
          },
        ],
      },
      {
        label: "relay",
        children: [
          {
            label: "relay+tcp",
            json: getProxyJson("relay", "tcp"),
          },
          {
            label: "relay+tls",
            json: getProxyJson("relay", "tls"),
          },
          {
            label: "relay+wss",
            json: getProxyJson("relay", "tls"),
          },
        ],
      },
      {
        label: "socks",
        children: [
          {
            label: "socks4",
            json: getProxyJson("socks", "tcp"),
          },
          {
            label: "socks5",
            json: getProxyJson("socks5", "tcp"),
          },
          {
            label: "socks5(支持udp)",
            json: getProxyJson("socks5", "tcp", { udp: "true" }),
          },
          {
            label: "socks5+tls",
            json: getProxyJson("socks5", "tls", { notls: "true" }),
          },
        ],
      },
    ],
  },
  {
    label: "代理转发",
    cli: "-L socks5://:1080 -F socks5://xxx.com:1080",
    json: `
      {
        "name": "service-0",
        "addr": ":1080",
        "handler": {
          "type": "socks5",
          "chain": "chain-0"
        },
        "listener": {
          "type": "tcp"
        }
      }`,
  },
] as Template[];
