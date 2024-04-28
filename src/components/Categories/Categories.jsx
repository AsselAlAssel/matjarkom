import React, { useMemo, useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryPlaceHolder from "../CategoryPlaceHolder/CategoryPlaceHolder";
import usePopoverState from "../../hooks/usePopoverState";
import { Menu, MenuItem } from "@mui/material";
import CategoryForm from "../CategoryForm/CategoryForm";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { useSelector } from "react-redux";
import { selectUser } from "../../Stores/project/auth";
import { useLocation } from "react-router-dom";
import {
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../../hooks/useMerchant";
import { mutate } from "swr";

const Categories = ({ categories }) => {
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [open, anchorEl, handleOpen, handleClose] = usePopoverState();
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  const index = useMemo(() => {
    return categories.indexOf(selectedCategory);
  }, [selectedCategory, categories]);

  const { trigger: createCategory, isMutating } = useCreateCategory(email);
  const { trigger: deleteCategory, isMutating: isDeleting } =
    useDeleteCategory(email);
  const { trigger: updateCategory, isMutating: isUpdating } =
    useUpdateCategory(email);
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
          {categories?.map((categoryName) => (
            <CategoryCard
              key={categoryName}
              setSelectedCategory={setSelectedCategory}
              handleOpen={handleOpen}
              categoryName={categoryName}
            />
          ))}
          {isOwner ? (
            <CategoryPlaceHolder
              onClickOnAddCategory={() => {
                setSelectedCategory(null);
                setOpenCategoryForm(true);
              }}
            />
          ) : null}
        </div>
      </div>
      <CategoryForm
        open={openCategoryForm}
        handleClose={() => {
          setOpenCategoryForm(false);
          setSelectedCategory(null);
        }}
        selectedCategory={selectedCategory}
        onSubmit={async (data) => {
          if (selectedCategory) {
            // update category
            await updateCategory({
              index,
              specificCategoryName: data.specificStoreCategories,
              email,
            });
            setSelectedCategory(null);
            setOpenCategoryForm(false);
            mutate(`test-get-merchant-cart/${email}`);
            return;
          }
          await createCategory(data);
          setOpenCategoryForm(false);
          mutate(`test-get-merchant-cart/${email}`);
        }}
        isSubmitting={isMutating || isUpdating}
      />
      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setOpenCategoryForm(true);
            handleClose();
          }}
        >
          Edit category
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            handleClose();
          }}
        >
          Delete category
        </MenuItem>
      </Menu>
      <DeleteDialog
        deleteDialogOpen={deleteDialogOpen}
        handleDeleteDialogClose={() => {
          setDeleteDialogOpen(false);
        }}
        handleDelete={async () => {
          await deleteCategory({
            index,
          });
          mutate(`test-get-merchant-cart/${email}`);
          setDeleteDialogOpen(false);
        }}
        title={"Delete Category"}
        description={"Are you sure you want to delete this category?"}
      />
    </div>
  );
};

export default Categories;
