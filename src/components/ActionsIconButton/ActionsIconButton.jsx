import { ButtonBase } from "@mui/material";
import { FiMoreHorizontal } from "react-icons/fi";

export default function ActionsIconButton(props) {
  return (
    <ButtonBase
      {...props}
      sx={{
        width: 36,
        height: 36,
        borderRadius: "8px",
        border: "1px solid #8D7ACC",
        bgcolor: "white",
        ...props.sx,
      }}
    >
      <FiMoreHorizontal className="text-[#8D7ACC] text-2xl" />
    </ButtonBase>
  );
}
