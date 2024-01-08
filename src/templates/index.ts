import * as JSONC from "jsonc-parser";
import admissions from "./admissions";
import authers from "./authers";
import chains from "./chains";
import bypasses from "./bypasses";
import hops from "./hops";
import hosts from "./hosts";
import ingresses from "./ingresses";
import routers from "./routers";
import services from "./services";
import climiters from "./climiters";
import limiters from "./limiters";
import rlimiters from "./rlimiters";
import resolvers from "./resolvers";
import { Template } from "./type";

export type { Template };

const proxyTypes = "http,http2,socks,socks5,ss,ssu,sni,relay";
const listenerTypes =
  "h2,h2c,h3,tls,dtls,ws,wss,grpc,quic,pht,phts,kcp,ssh,mtcp";

export default {
  admissions: admissions,
  authers: authers,
  bypasses: bypasses,
  chains: chains,
  climiters: climiters,
  limiters: limiters,
  rlimiters: rlimiters,
  hops: hops,
  hosts: hosts,
  ingresses: ingresses,
  resolvers: resolvers,
  routers: routers,

  services: services,
} as Record<string, Template[]>;
/*

{
      "name": "limiter-0",
      "limits": [
        "$ 100MB 100MB",
        "$$ 10MB",
        "192.168.1.1  512KB 1MB",
        "192.168.0.0/16  1MB  5MB"
      ]
    }
{
      "name": "rlimiter-0",
      "limits": [
        "$ 100",
        "$$ 10",
        "192.168.1.1  50",
        "192.168.0.0/16  5"
      ]
    }
{
      "name": "climiter-0",
      "limits": [
        "$ 1000",
        "$$ 100",
        "192.168.1.1  10"
      ]
    }
*/
