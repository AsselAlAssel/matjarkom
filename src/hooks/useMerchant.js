import useSWRMutation from "swr/mutation";
import axiosClient from "../Plugins/axios";
import { enqueueSnackbar } from "notistack";
import useSWR from "swr";

export const MerchantLogin = async (key, { arg }) => {
  return axiosClient.post(key, arg);
};

export const useLoginMerchant = () => {
  const {
    trigger: login,
    data,
    error,
    isMutating: isLoading,
  } = useSWRMutation("merchant-login", MerchantLogin, {
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message ?? "Something went wrong",
        {
          variant: "error",
        },
      );
    },
  });
  return {
    login,
    data,
    error,
    isLoading,
  };
};

export const getStoreProfile = async (key) => {
  return axiosClient.get(key);
};
export const useStoreProfile = (email) => {
  if (!email)
    return { data: null, error: null, isLoading: false, mutate: null };
  const { data, error, isLoading, mutate } = useSWR(
    `merchant-profile/${email}`,
    getStoreProfile,
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const getStoreProducts = async (key) => {
  return axiosClient.get(key);
};

export const useStoreProducts = (email) => {
  const { data, error, isLoading, mutate } = useSWR(
    `test-get-merchant-cart/${email}`,
    getStoreProducts,
  );
  return { data, error, isLoading, mutate };
};
