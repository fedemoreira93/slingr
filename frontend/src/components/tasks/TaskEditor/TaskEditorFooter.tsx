import { Box, Button } from "@mui/material";
import React from "react";

const footerStyle = {
  padding: "20px 25px",
  textAlign: "right",
};

const TaskEditorFooter: React.FC<{
  onCancel: () => void;
  submitText: string;
}> = ({ onCancel, submitText }) => (
  <Box sx={footerStyle}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "20px",
        justifyContent: "flex-end",
      }}
    >
      <Button
        style={{ textTransform: "none", color: "#2A323C" }}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        style={{ textTransform: "none" }}
      >
        {submitText}
      </Button>
    </div>
  </Box>
);

export default TaskEditorFooter;
