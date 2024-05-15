import useSWRMutation from "swr/mutation";
import axiosClient from "../Plugins/axios";
import { enqueueSnackbar } from "notistack";
import useSWR from "swr";

export const userLogin = async (key, { arg }) => {
  return axiosClient.post("login", arg);
};

export default function useLoginUser() {
  const {
    trigger: login,
    data,
    error,
    isMutating: isLoading,
  } = useSWRMutation("login", userLogin, {
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
}

const userRegisterFun = async (key, { arg }) => {
  return axiosClient.post("register", arg);
};

export const useRegisterUser = () => {
  const {
    trigger: register,
    data,
    error,
    isMutating: isLoading,
  } = useSWRMutation("register", userRegisterFun);
  return { register, data, error, isLoading };
};

async function getUserProfile(key) {
  const res = await axiosClient.get(key);
  return res.data;
}

export const useUser = (email) => {
  const { data, isLoading, mutate, error } = useSWR(
    `profile/${email}`,
    getUserProfile,
  );
  return { data, isLoading, mutate, error };
};

export const updateUserProfile = async (key, { arg }) => {
  return axiosClient.patch(key, arg);
};

export const useUpdateUserProfile = (email) => {
  const { trigger, isMutating } = useSWRMutation(
    `update-user-profile/${email}`,
    updateUserProfile,
  );
  return { trigger, isMutating };
};
