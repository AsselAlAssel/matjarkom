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
import { useSelector } from "react-redux";
import { selectUser } from "../../Stores/project/auth";
import { useLocation } from "react-router-dom";

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

const Hero = ({ images }) => {
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
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");
  const user = useSelector(selectUser);
  const isOwner = user?.email === email && user?.isMerchant;
  return (
    <div className="container">
      <div
        className="overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex justify-center items-center
"
      >
        <div className="container pb-8 sm:pb-0">
          {/* Hero section */}
          <Slider {...settings}>
            {images?.map((url) => (
              <div key={url} className="relative">
                {isOwner ? (
                  <ActionsIconButton
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      zIndex: 1000,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHero(data);
                      handleOpen(e);
                    }}
                  />
                ) : null}
                <div>
                  <div
                    style={
                      {
                        // backgroundColor: "red",
                      }
                    }
                  >
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <img
                        src={url}
                        alt=""
                        className="w-full sm:w-[450px] h-[300px] sm:h-[450px] sm:scale-105 lg:scale-120 object-fit mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isOwner ? (
              <HeroPlaceHolder openForm={() => setOpen(true)} />
            ) : null}
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
