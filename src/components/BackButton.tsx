import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, Button } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";
import { type FC, useCallback } from "react";

export const BackButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate({ to: ".." });
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
