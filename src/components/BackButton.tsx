import Button from "@mui/material/Button";
import { type FC, useCallback } from "react";
import { useNavigate } from "react-router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Box from "@mui/material/Box";

export const BackButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(-1);
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
