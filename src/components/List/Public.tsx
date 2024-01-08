import React, { useContext, useEffect } from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import { red, green } from "@ant-design/colors";
import { getRESTfulApi } from "../../api";
import JsonForm, { showJsonForm } from "../Forms/Json";
import { jsonFormatValue, jsonParse } from "../../uitls";
import {
  CheckCircleOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { GostCommit, fixOldCacheConfig } from "../../api/local";
import { CardCtx } from "../../uitls/ctx";
import { UseListData, UseListData1, UseTemplates } from "../ListCard/hooks";
import { configEvent } from "../../uitls/events";

export type PublicListProps = {
  name: string;
  title: string;
  api: ReturnType<typeof getRESTfulApi>;
  localApi?: GostCommit;
  keyName: string;
  rowKey?: string;
  renderConfig?: (
    v: any,
    r: any,
    i: number
  ) => React.ReactNode;
};

export const UpdateCtx = React.createContext<{ update?: (v: any) => any }>({});

const defaultRenderConfig = (value: any, record: any, index: number) => {
  return JSON.stringify(record);
};

const PublicList: React.FC<PublicListProps> = (props) => {
  const {
    name,
    title,
    api,
    localApi,
    keyName,
    rowKey = "name",
    renderConfig = defaultRenderConfig,
  } = props;
  const { localList, comm } = useContext(CardCtx);
  // const { dataList, dataSource } = UseListData({ localList, name: keyName });
  const { dataList, dataSource } = UseListData1({ localApi, name: keyName });
  const templates = UseTemplates({ name: keyName });

  const {
    deleteValue,
    updateValue,
    dispatch,
    enable,
    updateLocal,
    deleteLocal,
    addValue,
    // } = comm.current;
  } = comm!;

  return (
    <div style={{ height: 348, overflow: "auto" }}>
      <Table
        rowKey={(obj) => obj._id_ || obj.name}
        scroll={{ y: 246 }}
        size="small"
        dataSource={dataSource}
        columns={[
          { title: rowKey, dataIndex: rowKey, ellipsis: true, width: 100 },
          {
            title: "详情",
            ellipsis: true,
            render: (value, record, index) => {
              const isEnable = dataList.includes(record);
              const update = isEnable
                ? updateValue.bind(null, record.name)
                : updateLocal.bind(null, record.name);
              let render: React.ReactNode;
              try {
                render = renderConfig(value, record, index);
              } catch (e) {
                render = defaultRenderConfig(value, record, index);
              }
              return (
                <UpdateCtx.Provider value={{ update }}>
                  {render}
                </UpdateCtx.Provider>
              );
            },
          },
          {
            title: "操作",
            width: localApi ? 120 : 90,
            align: "right",
            dataIndex: rowKey,
            render: (value, record, index) => {
              // console.log("render", record);
              const isEnable = dataList.includes(record);
              return (
                <Space size={2}>
                  {localApi ? (
                    isEnable ? (
                      <Button
                        title="点击禁用"
                        icon={
                          <CheckCircleOutlined
                            style={{ color: green.primary }}
                          />
                        }
                        type="link"
                        size={"small"}
                        onClick={async () => {
                          await dispatch(record);
                        }}
                      >
                        {/* 禁用 */}
                      </Button>
                    ) : (
                      <Button
                        title="点击启用"
                        type="link"
                        icon={<StopOutlined style={{ color: red.primary }} />}
                        size={"small"}
                        onClick={async () => {
                          await enable(record);
                        }}
                      >
                        {/* 启用 */}
                      </Button>
                    )
                  ) : null}
                  <Button
                    title="修改"
                    icon={<EditOutlined />}
                    type="link"
                    size={"small"}
                    onClick={() => {
                      showJsonForm({
                        title: `修改 ${value || ""}`,
                        templates: templates,
                        initialValues: { value: jsonFormatValue(record) },
                        onFinish: async (values: any) => {
                          const { value } = values;
                          const json = jsonParse(value);
                          if (isEnable) {
                            await updateValue(record.name, json);
                            return true;
                          } else {
                            await updateLocal(record.name, {
                              ...record,
                              ...json,
                            });
                            return true;
                          }
                        },
                      });
                    }}
                  />
                  <Button
                    title="复制"
                    icon={<CopyOutlined />}
                    type="link"
                    size={"small"}
                    onClick={() => {
                      showJsonForm({
                        title: `复制自 ${value || ""}`,
                        templates: templates,
                        initialValues: { value: jsonFormatValue(record) },
                        onFinish: async (values: any) => {
                          const { value } = values;
                          const json = jsonParse(value);
                          await comm!.addValue(json);
                          return true;
                        },
                      });
                    }}
                  />
                  <Popconfirm
                    title="警告"
                    description="确定要删除吗？"
                    onConfirm={() => {
                      if (isEnable) {
                        deleteValue(record);
                      } else {
                        deleteLocal(record);
                      }
                    }}
                  >
                    <Button
                      title="删除"
                      icon={<DeleteOutlined />}
                      type="link"
                      size={"small"}
                    />
                  </Popconfirm>
                </Space>
              );
            },
          },
        ]}
      ></Table>
    </div>
  );
};
export default PublicList;
