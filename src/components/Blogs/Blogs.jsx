import React, { Fragment, useState } from "react";
import Heading from "../Shared/Heading";

// import images
import Img1 from "../../assets/blogs/blog-1.jpg";
import Img2 from "../../assets/blogs/blog-2.jpg";
import Img3 from "../../assets/blogs/blog-3.jpg";
import BlogForm from "../BlogForm/BlogForm";
import BlogPlaceHolder from "../BlogPlaceHolder/BlogPlaceHolder";
import ActionsIconButton from "../ActionsIconButton/ActionsIconButton";
import usePopoverState from "../../hooks/usePopoverState";
import { Menu, MenuItem } from "@mui/material";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const BlogData = [
  {
    title: "How to choose perfect smartwatch",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024 by Dilshad",
    image: Img1,
    link: "https://www.google.com",
  },
  {
    title: "How to choose perfect gadget",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024 by Satya",
    image: Img2,
    link: "https://www.google.com",
  },
  {
    title: "How to choose perfect VR headset",
    subtitle:
      "minima facere deserunt vero illo beatae deleniti eius dolores consequuntur, eligendi corporis maiores molestiae laudantium. Porro?",
    published: "Jan 20, 2024 by Sabir",
    image: Img3,
    link: "https://www.google.com",
  },
];
const Blogs = () => {
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openMenu, anchorEl, handleOpen, handleClose] = usePopoverState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className="my-12">
      <div className="container">
        {/* Header section */}
        <Heading title="Recent News" subtitle={"Explore Our Blogs"} />

        {/* Blog section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-8 sm:gap-4 md:gap-7">
          {/* Blog card */}
          {BlogData.map((data, index) => (
            <div
              data-aos="fade-up"
              data-aos-delay={index * 150}
              key={data.title}
              className="bg-white dark:bg-gray-900 cursor-pointer relative"
              onClick={() => window.open(data.link, "_blank")}
            >
              <ActionsIconButton
                sx={{
                  position: "absolute",
                  right: 4,
                  top: 4,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBlog(data);
                  handleOpen(e);
                }}
              />
              {/* image section */}
              <div className="overflow-hidden rounded-2xl mb-2">
                <img
                  src={data.image}
                  alt=""
                  // add them on hover in user side hover:scale-105 duration-500
                  className="w-full h-[220px] object-cover rounded-2xl "
                />
              </div>
              {/* content section */}
              <div className="space-y-2">
                <p className="text-xs text-gray-500">{data.published}</p>
                <p className="font-bold line-clamp-1">{data.title}</p>
                <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {data.subtitle}
                </p>
              </div>
            </div>
          ))}
          <div data-aos="fade-up" data-aos-delay={200}>
            <BlogPlaceHolder
              onClickAddBlog={() => {
                setOpen(true);
                setSelectedBlog(null);
              }}
            />
          </div>
        </div>
      </div>
      <BlogForm
        open={open}
        handleClose={() => setOpen(false)}
        selectedBlog={selectedBlog}
      />
      <Menu open={openMenu} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setOpen(true);
            handleClose();
          }}
        >
          Edit Blog
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            setSelectedBlog(null);
            handleClose();
          }}
        >
          Delete Blog
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
        title={"Delete Blog"}
        description={"Are you sure you want to delete this blog?"}
      />
    </div>
  );
};

export default Blogs;
