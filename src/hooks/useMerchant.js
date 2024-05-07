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
// cartName, cartPrice, cartDiscount, cartLiked, cartFavourite, cartDescription, cartCategory, cartQuantities, index, cartRate
const updateProduct = async (key, { arg }) => {
  try {
    return axiosClient.patch(key, {
      cartName: arg.cartName,
      cartPrice: arg.cartPrice,
      cartDiscount: arg.cartDiscount,
      cartLiked: arg.cartLiked,
      cartFavourite: arg.cartFavourite,
      cartDescription: arg.cartDescription,
      cartCategory: arg.cartCategory,
      cartQuantities: arg.cartQuantities,
      index: arg.index,
      cartRate: arg.cartRate,
    });
  } catch (error) {
    console.log(error);
  }
};

export const useUpdateProductMutation = (email) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `test-update-specific-cart/${email}`,
    updateProduct,
  );
  return { trigger, isMutating, error };
};
const createCategory = async (key, { arg }) => {
  return axiosClient.post(key, arg);
};

export const useCreateCategory = (email) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `specific-store-categories/${email}`,
    createCategory,
  );
  return { trigger, isMutating, error };
};

const deleteCategory = async (key, { arg }) => {
  console.log(key, arg);
  return axiosClient.delete(key, { data: arg });
};

export const useDeleteCategory = (email) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `delete-category-connected-to-cart/${email}`,
    deleteCategory,
  );
  return { trigger, isMutating, error };
};

async function updateCategory(key, { arg }) {
  return axiosClient.patch(key, arg);
}

export const useUpdateCategory = (email) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `update-specific-store-categories/${email}`,
    updateCategory,
  );
  return { trigger, isMutating, error };
};

async function deleteImageFromSlider(key, { arg }) {
  return axiosClient.delete(key, { data: arg });
}
export const useDeleteImageFromSlider = (email) => {
  const { trigger, isMutating, error } = useSWRMutation(
    `delete-specific-image-from-store-slider/${email}`,
    deleteImageFromSlider,
  );
  return { trigger, isMutating, error };
};
