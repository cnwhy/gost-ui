import { Space, Tag, Tooltip } from "antd";
import { ChainConfig, Config, HopConfig } from "../../api/types";
import { ViewHop, viewHops } from "./hop";
import { RightOutlined } from "@ant-design/icons";

export default function viewChain(this: Partial<Config>, chain: ChainConfig) {
  const { hops } = chain;
  return viewHops.call(this, hops);
}

export function ViewHops(props: { hops: HopConfig[] }) {
  console.log(props);
  return (
    <Space size={5}>
      {props.hops
        .map((hop) => {
          const tootip = <ViewHop {...hop} />;
          return (
            <Tooltip title={tootip} color="#c7e7ff" arrow={false}>
              <Tag bordered={false} color="blue">
                {hop.name}
              </Tag>
            </Tooltip>
          );
        })
        .reduce((a: any, b, index) => {
          if (a.length > 0)
            a.push(<RightOutlined style={{ color: "blue", fontSize: 12 }} />);
          a.push(b);
          return a;
        }, [])}
    </Space>
  );
}

export function ViewChain(this: Partial<Config>, chain: ChainConfig) {
  const { hops } = chain;
  // return viewHops.call(this, hops);
  return <ViewHops hops={hops} />;
}
