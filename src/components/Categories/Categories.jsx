import React, { useState } from "react";
import CategoryCard from "../CategoryCard/CategoryCard";
import CategoryPlaceHolder from "../CategoryPlaceHolder/CategoryPlaceHolder";
import usePopoverState from "../../hooks/usePopoverState";
import { Menu, MenuItem } from "@mui/material";
import CategoryForm from "../CategoryForm/CategoryForm";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const Categories = () => {
  const [categories, setCategories] = useState([1, 2, 3, 4]);
  const [openCategoryForm, setOpenCategoryForm] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [open, anchorEl, handleOpen, handleClose] = usePopoverState();
  return (
    <div className="py-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:px-10 gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category}
              setSelectedCategory={setSelectedCategory}
              openCategoryForm={openCategoryForm}
              handleOpen={handleOpen}
            />
          ))}
          <CategoryPlaceHolder
            onClickOnAddCategory={() => {
              setSelectedCategory(null);
              setOpenCategoryForm(true);
            }}
          />
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
