import qs from "qs";
import { Config, NodeConfig } from "../../api/types";
import { useContext, useMemo } from "react";
import Ctx from "../../uitls/ctx";
import { Space, Tag, Tooltip } from "antd";

export function viewNode(this: Partial<Config>, data: NodeConfig) {
  const {
    name,
    addr,
    connector: { type: connectorType, metadata },
    dialer: { type: dialerType },
  } = data;

  const _metadata = metadata ? qs.stringify(metadata) : "";
  return `${connectorType}${dialerType ? "+" + dialerType : ""}://${addr}${
    _metadata ? "?" + _metadata : ""
  }`;
}

const NodeFormat = (props: NodeConfig) => {
  const {
    name,
    addr,
    connector: { type: connectorType, metadata },
    dialer: { type: dialerType },
  } = props;
  const _metadata = metadata ? qs.stringify(metadata) : "";
  return (
    <Space>
      <Tag color="#87d068">{`${connectorType}${dialerType ? "+" + dialerType : ""}`}</Tag>
      <Tag color="green">{addr}</Tag>
      {_metadata && <Tag color="purple" title="_metadata">metadata</Tag>}
    </Space>
  );
};

export const ViewNode = (props: NodeConfig) => {
  const { name } = props;
  const { gostConfig } = useContext(Ctx);
  const title = useMemo(
    () => viewNode.call(gostConfig!, props),
    [props, gostConfig]
  );
  return (
    <Tooltip color="#ddffbf" title={<NodeFormat {...props} />}>
      <Tag bordered={false} color="green">
        {name}
      </Tag>
    </Tooltip>
  );
};
