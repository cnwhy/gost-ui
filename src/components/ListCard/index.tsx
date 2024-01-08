import { useCallback, useEffect, useState, useMemo } from "react";
import { getRESTfulApi } from "../../api";
import { ProCard } from "@ant-design/pro-components";
import PublicList, { PublicListProps } from "../List/Public";
import AddButton from "../Forms/AddButton";
import { GostCommit } from "../../api/local";
import { CardCtx, Comm } from "../../uitls/ctx";
import { UseListData, UseListData1 } from "./hooks";
import { Modal, notification } from "antd";
import { getModule } from "../../api/modules";
import { configEvent } from "../../uitls/events";

export type ListCardProps = {
  module?: string;
  name?: string;
  title?: string;
  subTitle?: string;
  api?: ReturnType<typeof getRESTfulApi>;
  keyName?: string;
  rowKey?: string;
  localApi?: GostCommit;
  boxShadow?: boolean;
  bordered?: boolean;
  renderConfig?: PublicListProps["renderConfig"];
};

const ListCard: React.FC<ListCardProps> = (props) => {
  const {
    title,
    subTitle,
    name,
    keyName,
    api,
    boxShadow = true,
    bordered = false,
    rowKey = "name",
    renderConfig,
    localApi,
  } = useMemo(() => {
    return { ...getModule(props.module || "")!, ...props };
  }, [props]);
  const _prop = {
    title: subTitle || "",
    name,
    api,
    keyName,
    rowKey,
    localApi,
    renderConfig,
  };
  // const [localList, setLocalList] = useState<any[]>([]);
  // const updateLocalList = useCallback(() => {
  //   if (!localApi) return;
  //   localApi.getList().then((data) => {
  //     // console.log("updateLocalList", data);
  //     setLocalList(data);
  //   });
  // }, [localApi]);

  // useEffect(() => {
  //   updateLocalList();
  // }, [updateLocalList]);

  // const { dataSource } = UseListData({ name: keyName, localList });
  const { dataSource } = UseListData1({ localApi, name: keyName });

  const comm = useMemo<Comm>(() => {
    const addValue = async (servic: any) => {
      await api.post(servic);
    };
    return {
      updateValue: async (id: string, value: any, update = true) => {
        await api.put(id, value);
        update && configEvent.emit("apiUpdate", {});
      },
      deleteValue: async (value: any, update = true) => {
        await api.delete(value.name);
        update && configEvent.emit("apiUpdate", {});
      },
      addValue: async (json: any, update = true) => {
        let addName = json.name || `${name}-0`;
        const hasName = () => {
          return dataSource?.find((item: any) => {
            return item.name === addName;
          });
        };
        if (hasName()) {
          const confirmed = await new Promise((resolve, reject) => {
            Modal.confirm({
              title: "name无效",
              content: "是否自动分配name",
              zIndex: 2000,
              onOk: () => resolve(true),
              onCancel: () => resolve(false),
            });
          });
          if (!confirmed) throw false;
        }
        while (hasName()) {
          addName = (addName as string).replace(/\d*$/, (a) => {
            return String(a == "" ? "-0" : Number(a) + 1);
          });
        }
        await addValue({ ...json, name: addName });
        json.name !== addName &&
          notification.info({
            description: `新分配 name 为 "${addName}"`,
            message: "自动修正提醒",
          });
        update && configEvent.emit("apiUpdate", {});
      },
      dispatch: async (value: any) => {
        if (!localApi) return;
        await api.delete(value.name);
        await localApi.add(value);
        configEvent.emit("update");
        // updateLocalList?.();
      },
      enable: async (value: any) => {
        if (!localApi) return;
        await api.post(value);
        await localApi.delete(value.name);
        configEvent.emit("update");
        // updateLocalList?.();
      },
      updateLocal: async (key: string, value: any) => {
        if (!localApi) return;
        // const data = jsonParse(value);
        await localApi.put(key, { ...value, name: key });
        configEvent.emit("localUpdate");
        // updateLocalList?.();
      },
      deleteLocal: async (value: any) => {
        if (!localApi) return;
        await localApi.delete(value.name);
        configEvent.emit("localUpdate");
        // updateLocalList?.();
      },
    };
  }, [api, dataSource, localApi, name]);

  return (
    <CardCtx.Provider value={{ name, comm }}>
      <ProCard
        boxShadow={boxShadow}
        bordered={bordered}
        title={title}
        extra={<AddButton {..._prop} />}
      >
        <PublicList {..._prop}></PublicList>
      </ProCard>
    </CardCtx.Provider>
  );
};
export default ListCard;
