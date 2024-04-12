import React, { useState } from "react";
import Slider from "react-slick";
import Image1 from "../../assets/hero/headphone.png";
import Image2 from "../../assets/category/vr.png";
import Image3 from "../../assets/category/macbook.png";
import HeroForm from "../HeroForm/HeroForm";
import ActionsIconButton from "../ActionsIconButton/ActionsIconButton";
import { Menu, MenuItem } from "@mui/material";
import usePopoverState from "../../hooks/usePopoverState";
import HeroPlaceHolder from "./HeroPlaceHolder";
import DeleteDialog from "../DeleteDialog/DeleteDialog";

const HeroData = [
  {
    id: 1,
    img: Image1,
    title: "Wireless",
    title2: "Headphone",
  },
  {
    id: 2,
    img: Image2,
    title: "Wireless",
    title2: "Virtual",
  },
  {
    id: 1,
    img: Image3,
    title: "Branded",
    title2: "Laptops",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
  };
  const [open, setOpen] = useState(false);
  const [selectedHero, setSelectedHero] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [openMenu, anchorEl, handleOpen, handleClose] = usePopoverState();
  return (
    <div className="container">
      <div
        className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center
"
      >
        <div className="container pb-8 sm:pb-0">
          {/* Hero section */}
          <Slider {...settings}>
            {HeroData.map((data) => (
              <div key={data.id} className="relative">
                <ActionsIconButton
                  sx={{ position: "absolute", right: 0, top: 0, zIndex: 1000 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedHero(data);
                    handleOpen(e);
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* text content section */}
                  <div className="flex flex-col justify-center gap-4 sm:pl-3 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10 ">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                    >
                      {data.title}
                    </h1>
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                    >
                      {data.title2}
                    </h1>
                  </div>
                  {/* Img section */}
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={data.img}
                        alt=""
                        className="w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <HeroPlaceHolder openForm={() => setOpen(true)} />
          </Slider>
        </div>
      </div>
      <HeroForm
        open={open}
        handleClose={() => {
          setOpen(false);
          setSelectedHero(null);
        }}
        selectedHero={selectedHero}
      />
      <Menu
        open={openMenu}
        anchorEl={anchorEl}
        onClose={() => {
          setSelectedHero(null);
          handleClose();
        }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            handleClose();
          }}
        >
          Edit Hero
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
            handleClose();
          }}
        >
          Delete Hero
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
        title={"Delete Hero"}
        description={"Are you sure you want to delete this hero?"}
      />
    </div>
  );
};

export default Hero;
