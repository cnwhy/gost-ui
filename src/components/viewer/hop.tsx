import { useContext } from "react";
import { Config, HopConfig, NodeConfig } from "../../api/types";
import { viewNode, ViewNode } from "./node";
import Ctx from "../../uitls/ctx";
import { Space, Tag, Tooltip } from "antd";
import { UpdateCtx } from "../List/Public";

export default function viewHop(this: Partial<Config>, hop: HopConfig) {
  let _hop = hop;
  if (!_hop.nodes) {
    _hop = this?.hops?.find((item) => item.name === _hop.name) || _hop;
  }
  const { nodes } = _hop;
  if (nodes?.length <= 0) return `[${hop.name}(noNodes)]`;
  const _nodes = nodes.map(viewNode.bind(this));
  return _nodes.join(",");
}

export function viewHops(this: Partial<Config>, hops: HopConfig[]) {
  return hops.map(viewHop.bind(this)).join(" -> ");
}

export const ViewHop = (props: HopConfig) => {
  let _hop = props;
  let isLink = false;
  const { gostConfig } = useContext(Ctx);
  if (!_hop.nodes) {
    const linkHop = gostConfig!.hops?.find((item) => item.name === _hop.name);
    if (linkHop) {
      isLink = true;
      _hop = linkHop;
    }
  }
  const { nodes } = _hop;
  if (!nodes || nodes?.length <= 0) return `[${props.name}(noNodes)]`;

  if (isLink) {
    return (
      <UpdateCtx.Provider value={{}}>
        <Space size={5}>
          {nodes.map((node) => (
            <ViewNode node={node} isLink />
          ))}
        </Space>
      </UpdateCtx.Provider>
    );
  }

  return (
    <Space size={5}>
      {nodes.map((node, i) => (
        <ViewNode node={node} upjson={(newNode:NodeConfig)=>nodes[i]=newNode} />
      ))}
    </Space>
  );
};
