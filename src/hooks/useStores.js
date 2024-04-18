import useSWR from "swr";
import axiosClient from "../Plugins/axios";

const getAlStores = async (key) => {
  console.log("key", key);
  return axiosClient.get(key).then((res) => res.data);
};

export default function useStores() {
  const { data, error, isLoading, mutate } = useSWR(
    "get-all-stores",
    getAlStores,
  );
  return { data, error, isLoading, mutate };
}
