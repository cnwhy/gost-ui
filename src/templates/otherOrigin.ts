import { Template } from "./type";

export const getFileTemplate = (name: string) => {
  return `{
    "name": "${name}-0",
    "file": {
      "path": "/path/to/file"
    }
  }`;
};

export const getRedisTemplate = (name: string, type?: string) => {
  return `{
    "name": "${name}-0",
    "redis": {
      "addr": "127.0.0.1:6379",
      "db": "1",
      "password": "123456",
      ${type ? `"type": "${type}"` : ""}
      "key": "gost:${name}-0"
    }
  }`;
};

export const getHttpTemplate = (name: string) => {
  return `{
    "name": "${name}-0",
    "http": {
      "url": "http://127.0.0.1:8000",
      "timeout": "10s"
    }
  }`;
};

export const getOtherAll = (
  name: string,
  docUrl: string = "",
  options?: { redisType?: string }
) => {
  const doc = docUrl ? `// ${docUrl} \n` : "";
  return [
    {
      label: "文件",
      json: doc + getFileTemplate(name),
    },
    {
      label: "Redis",
      json: doc + getRedisTemplate(name, options?.redisType),
    },
    {
      label: "HTTP",
      json: doc + getHttpTemplate(name),
    },
  ] as Template[];
};
