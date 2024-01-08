import { findNodeAtLocation, parseTree } from "jsonc-parser";
import { Template } from "./type";
// 源自 https://gost.run/reference/configuration/file/
const defaultTemplates = `{
    "services": [
        {
            "name": "service-0",
            "addr": ":8080",
            // "interface": "eth0",
            // "admission": "admission-0",
            // "bypass": "bypass-0",
            // "resolver": "resolver-0",
            // "hosts": "hosts-0",
            "handler": {
                "type": "http",
                // "auth": {
                //     "username": "gost",
                //     "password": "gost"
                // },
                // "auther": "auther-0",
                // "retries": 1,
                // "chain": "chain-0",
                // "metadata": {
                //     "bar": "baz",
                //     "foo": "bar"
                // }
            },
            "listener": {
                "type": "tcp",
                // "auth": {
                //     "username": "user",
                //     "password": "pass"
                // },
                // "auther": "auther-0",
                "chain": "chain-0",
                // "tls": {
                //     "certFile": "cert.pem",
                //     "keyFile": "key.pem",
                //     "caFile": "ca.pem"
                // },
                // "metadata": {
                //     "abc": "xyz",
                //     "def": 456
                // }
            },
            // "forwarder": {
            //     "nodes": [
            //         {
            //             "name": "target-0",
            //             "addr": "192.168.1.1:1234"
            //         },
            //         {
            //             "name": "target-1",
            //             "addr": "192.168.1.2:2345"
            //         }
            //     ],
            //     "selector": {
            //         "strategy": "round",
            //         "maxFails": 1,
            //         "failTimeout": 30
            //     }
            // }
        }
    ],
    "chains": [
        {
            "name": "chain-0",
            // "selector": {
            //     "strategy": "round",
            //     "maxFails": 1,
            //     "failTimeout": 30
            // },
            "hops": [
                {
                    "name": "hop-0",
                    // "interface": "192.168.1.2",
                    // "selector": {
                    //     "strategy": "rand",
                    //     "maxFails": 3,
                    //     "failTimeout": 60
                    // },
                    // "bypass": "bypass-0",
                    "nodes": [
                        {
                            "name": "node-0",
                            "addr": ":1080",
                            // "interface": "eth1",
                            // "bypass": "bypass-0",
                            "connector": {
                                "type": "socks5",
                                "auth": {
                                    "username": "user",
                                    "password": "pass"
                                },
                                // "metadata": {
                                //     "foo": "bar"
                                // }
                            },
                            "dialer": {
                                "type": "tcp",
                                // "auth": {
                                //     "username": "user",
                                //     "password": "pass"
                                // },
                                // "tls": {
                                //     "caFile": "ca.pem",
                                //     "secure": true,
                                //     "serverName": "example.com"
                                // },
                                // "metadata": {
                                //     "bar": "baz"
                                // }
                            }
                        }
                    ]
                }
            ]
        }
    ],
    "authers": [
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
        }
    ],
    "admissions": [
        {
            "name": "admission-0",
            "whitelist": false,
            "matchers": [
                "127.0.0.1",
                "192.168.0.0/16"
            ]
        }
    ],
    "bypasses": [
        {
            "name": "bypass-0",
            "whitelist": false,
            "matchers": [
                "*.example.com",
                ".example.org",
                "0.0.0.0/8"
            ]
        }
    ],
    "resolvers": [
        {
            "name": "resolver-0",
            "nameservers": [
                {
                    "addr": "udp://8.8.8.8:53",
                    "chain": "chain-0",
                    "prefer": "ipv4",
                    "clientIP": "1.2.3.4",
                    "ttl": 60,
                    "timeout": 30
                },
                {
                    "addr": "tcp://1.1.1.1:53"
                },
                {
                    "addr": "tls://1.1.1.1:853"
                },
                {
                    "addr": "https://1.0.0.1/dns-query",
                    "hostname": "cloudflare-dns.com"
                }
            ]
        }
    ],
    "hosts": [
        {
            "name": "hosts-0",
            "mappings": [
                {
                    "ip": "127.0.0.1",
                    "hostname": "localhost"
                },
                {
                    "ip": "192.168.1.10",
                    "hostname": "foo.mydomain.org",
                    "aliases": [
                        "foo"
                    ]
                },
                {
                    "ip": "192.168.1.13",
                    "hostname": "bar.mydomain.org",
                    "aliases": [
                        "bar",
                        "baz"
                    ]
                }
            ]
        }
    ],
    "tls": {
        "certFile": "cert.pem",
        "keyFile": "key.pem",
        "caFile": "ca.pem"
    },
    "log": {
        "output": "stderr",
        "level": "debug",
        "format": "json",
        "rotation": {
            "maxSize": 100,
            "maxAge": 10,
            "maxBackups": 3,
            "localTime": false,
            "compress": false
        }
    },
    "profiling": {
        "addr": ":6060",
        "enabled": true
    },
    "api": {
        "addr": ":18080",
        "pathPrefix": "/api",
        "accesslog": true,
        "auth": {
            "username": "user",
            "password": "password"
        },
        "auther": "auther-0"
    },
    "metrics": {
        "addr": ":9000",
        "path": "/metrics"
    }
}`;

const error: any[] = [];
const tree = parseTree(defaultTemplates, error, { allowTrailingComma: true });

export const getDefaultTempplates = (name: string) => {
  if (!tree) return;
  const node = findNodeAtLocation(tree, [name, 0]);
  if (node) {
    const { offset, length } = node;
    return defaultTemplates.substring(offset, offset + length);
  }
  return;
};

export const getByName = (name: string, label = "默认") => {
  const defT = getDefaultTempplates(name);
//   console.log("defT", name, defT);
  if (defT) {
    return {
      label,
      json: defT,
    } as Template;
  }
};

export default defaultTemplates;
// export default jsonText;
