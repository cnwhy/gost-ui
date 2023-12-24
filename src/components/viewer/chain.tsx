import { ChainConfig, Config, HopConfig } from "../../api/types";
import { viewHops, ViewHops } from "./hop";

export default function viewChain(this: Partial<Config>, chain: ChainConfig) {
  const { hops } = chain;
  return viewHops.call(this, hops);
}

export function ViewChain(this: Partial<Config>, chain: ChainConfig) {
  const { hops } = chain;
  // return viewHops.call(this, hops);
  return <ViewHops hops={hops} />;
}
