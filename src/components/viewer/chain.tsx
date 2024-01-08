import { Space, Tag, Tooltip } from "antd";
import { ChainConfig, Config, HopConfig } from "../../api/types";
import { ViewHop, viewHops } from "./hop";
import { RightOutlined } from "@ant-design/icons";
import { showJsonForm } from "../Forms/Json";
import { jsonFormatValue, jsonParse } from "../../uitls";
import { useContext } from "react";
import { UpdateCtx } from "../List/Public";

export default function viewChain(this: Partial<Config>, chain: ChainConfig) {
  const { hops } = chain;
  return viewHops.call(this, hops);
}

export function ViewHops(props: { hops: HopConfig[]; root: any }) {
  const { update } = useContext(UpdateCtx);
  return (
    <Space size={5}>
      {props.hops
        .map((hop, i) => {
          const tootip = <ViewHop {...hop} />;
          return (
            <Tooltip title={tootip} color="#c7e7ff" arrow={false}>
              <Tag
                bordered={false}
                color="blue"
                style={{ cursor: "default" }}
                onDoubleClick={() => {
                  showJsonForm({
                    title: "修改",
                    initialValues: { value: jsonFormatValue(hop) },
                    onFinish: async (values: any) => {
                      props.hops[i] = jsonParse(values.value);
                      update!()
                      return true;
                    },
                  });
                }}
              >
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
  return <ViewHops hops={hops} root={chain} />;
}
