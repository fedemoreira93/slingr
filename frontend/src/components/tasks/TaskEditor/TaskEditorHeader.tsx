import { Box, Typography } from "@mui/material";
import React from "react";

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 25px",
  background: "#FAFAFA",
  borderBottom: "1px solid #e0e0e0",
  cursor: "default",
};

const headerTitleStyle = {
  fontFamily: '"Dosis", sans-serif',
  fontWeight: 600,
  fontSize: "18px",
  lineHeight: "23px",
  letterSpacing: "0.25px",
  color: "#5C6269",
};

const TaskEditorHeader: React.FC<{ title: string }> = ({ title }) => (
  <Box sx={headerStyle}>
    <Typography
      id="modal-modal-title"
      variant="h5"
      component="h2"
      sx={headerTitleStyle}
    >
      {title}
    </Typography>
    <div
      className="material-icons"
      style={{ color: "#555F7C", cursor: "pointer" }}
    >
      last_page
    </div>
  </Box>
);

export default TaskEditorHeader;
