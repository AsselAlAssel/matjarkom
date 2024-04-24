import React, { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryPlaceHolder from "../CategoryPlaceHolder/CategoryPlaceHolder";
import usePopoverState from "../../hooks/usePopoverState";
import { Menu, MenuItem } from "@mui/material";
import CategoryForm from "../CategoryForm/CategoryForm";
import DeleteDialog from "../DeleteDialog/DeleteDialog";
import { useSelector } from "react-redux";
import { selectIsMerchant } from "../../Stores/project/auth";

const Categories = ({ categories }) => {
  const [openCategoryForm, setOpenCategoryForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [open, anchorEl, handleOpen, handleClose] = usePopoverState();
  const isMerchant = useSelector(selectIsMerchant);

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
          {isMerchant ? (
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
        handleDelete={() => {
          setDeleteDialogOpen(false);
        }}
        title={"Delete Category"}
        description={"Are you sure you want to delete this category?"}
      />
    </div>
  );
};

export default Categories;
