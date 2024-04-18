import useSWRMutation from "swr/mutation";
import axiosClient from "../Plugins/axios";

export const userLogin = async (key, { arg }) => {
  return axiosClient.post("login", arg);
};

export default function useLoginUser() {
  const {
    trigger: login,
    data,
    error,
    isMutating: isLoading,
  } = useSWRMutation("login", userLogin);
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
