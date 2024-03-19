import { useMutation as tanstackUseMutation } from "@tanstack/react-query";
import { instance, queryBuilder } from "services";

export async function postData(options) {
  const { method = "POST", url, data, params } = options;
  return await instance({ method, url: queryBuilder(url, params), data });
}
export const useMutation = () => {
  return tanstackUseMutation({
    mutationFn: postData,
  });
};
