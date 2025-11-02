import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { type ReactNode, useCallback } from "react";
import { router } from "../../router.tsx";

export const BackButton = (): ReactNode => {
  const navigate = useNavigate();
  const handleClick = useCallback(async () => {
    router.history.back();
  }, [navigate]);
  return (
    <Box>
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<ChevronLeftIcon />}
        size="small"
      >
        Back
      </Button>
    </Box>
  );
};
