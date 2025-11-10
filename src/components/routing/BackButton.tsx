import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button } from "@mui/material";
import { type ReactNode } from "react";
import { router } from "../../router.tsx";

export const BackButton = (): ReactNode => {
  const handleClick = () => {
    router.history.back();
  };
  return (
    <Box>
      <Button onClick={handleClick} variant="outlined" startIcon={<ChevronLeftIcon />} size="small">
        Back
      </Button>
    </Box>
  );
};
