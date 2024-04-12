import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";

const StyledButton = styled(Button)({
  fontSize: "16px",
  fontWeight: 600,
  height: 44,
  border: "1px solid",
  boxShadow: "0px 1px 2px 0px #1018280D",
});
export const StyledCircleBox = styled(Box)({
  position: "absolute",
  width: "90px",
  height: "90px",
  backgroundColor: "transparent",
  borderRadius: "50%",
  border: "1px solid #F0F1F4",
  zIndex: -1,
});

export default function DeleteDialog(props) {
  const {
    deleteDialogOpen,
    handleDeleteDialogClose,
    handleDelete,
    title,
    description,
  } = props;
  return (
    <Dialog
      open={deleteDialogOpen}
      onClose={handleDeleteDialogClose}
      PaperProps={{
        style: {
          maxWidth: 400,
        },
      }}
    >
      <Box position="absolute" right={24} top={24}>
        <IconButton
          color="default"
          size="small"
          onClick={handleDeleteDialogClose}
        >
          <IoMdClose />
        </IconButton>
      </Box>
      <DialogTitle
        sx={{
          p: 3,
          pb: 4,
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            lineHeight: "28px",
            fontWeight: 600,
            mt: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            lineHeight: "20px",
            mt: 0.5,
            position: "relative",
            zIndex: 1,
          }}
        >
          {description}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
          }}
        >
          <StyledButton
            onClick={handleDeleteDialogClose}
            fullWidth
            sx={{
              bgcolor: "white",
              "&:hover": {
                backgroundColor: "#E0E0E0",
              },
            }}
          >
            Cancel
          </StyledButton>
          <StyledButton
            fullWidth
            onClick={handleDelete}
            sx={{
              backgroundColor: "#D92D20",
              borderColor: "#D92D20",
              color: "white",
              "&:hover": {
                backgroundColor: "#cf2b1f",
              },
            }}
          >
            Delete
          </StyledButton>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
