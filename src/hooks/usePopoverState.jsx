import { useState } from "react";

export default function usePopoverState() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return [open, anchorEl, handleOpen, handleClose];
}
