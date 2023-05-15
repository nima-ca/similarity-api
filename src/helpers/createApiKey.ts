import { CreateApiData } from "@src/types/api";

export const createApiKey = async () => {
  const res = await fetch("/api/api-key/create");
  const data = (await res.json()) as CreateApiData;

  if (data.error && data.createdApiKey === null) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(" "));
    }

    throw new Error("Something went wrong!");
  }

  return data.createdApiKey?.key;
};
