import qs from "qs";
import { Config, NodeConfig } from "../../api/types";
import { useContext, useMemo } from "react";
import Ctx from "../../uitls/ctx";
import { Tag } from "antd";

export default function viewNode(this: Partial<Config>, data: NodeConfig) {
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

export const ViewNode = (props: NodeConfig) => {
  const { name } = props;
  const { gostConfig } = useContext(Ctx);
  const title = useMemo(
    () => viewNode.call(gostConfig!, props),
    [props, gostConfig]
  );
  return <Tag bordered={false} color="success" title={title}>{name}</Tag>;
};
