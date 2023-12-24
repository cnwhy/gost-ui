import { useContext } from "react";
import { Config, HopConfig } from "../../api/types";
import viewNode, { ViewNode } from "./node";
import Ctx from "../../uitls/ctx";
import { Space, Tag, Tooltip } from "antd";

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
  const { gostConfig } = useContext(Ctx);
  if (!_hop.nodes) {
    _hop = gostConfig!.hops?.find((item) => item.name === _hop.name) || _hop;
  }
  const { nodes } = _hop;
  if (nodes?.length <= 0) return `[${props.name}(noNodes)]`;
  // const _nodes = nodes.map(viewNode.bind(this));
  // return _nodes.join(",");
  return (
    <>
      {nodes.map((node) => (
        <ViewNode {...node} />
      ))}
    </>
  );
};

export function ViewHops(props: { hops: HopConfig[] }) {
  console.log(props);
  return (
    <Space>
      {props.hops.map((hop) => {
        const tootip = <ViewHop {...hop} />;
        return (
          <Tooltip title={tootip}>
            <Tag bordered={false} color="blue">
              {hop.name}
            </Tag>
          </Tooltip>
        );
      })}
    </Space>
  );
}
