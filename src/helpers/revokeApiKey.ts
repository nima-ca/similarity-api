import { RevokeApiData } from "@src/types/api";
export const revokeApiKey = async () => {
  const res = await fetch("/api/api-key/revoke", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });

  const data = (await res.json()) as RevokeApiData;

  if (data.error) {
    if (typeof data.error === "string") throw new Error(data.error);
  }
};
