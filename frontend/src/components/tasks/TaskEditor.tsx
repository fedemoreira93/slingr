import {
  Autocomplete,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { TaskEditorProps } from "./Tasks.types";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "560px",
  bgcolor: "background.paper",
  boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.25)",
};

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

const contentStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  padding: "20px 25px",
  fontWeight: 400,
  paddingBottom: "200px",
};

const subtitle1Style = {
  fontSize: "18px",
  lineHeight: "24px",
  color: "#2A323C",
};

const subtitle2Style = {
  fontSize: "16px",
  lineHeight: "22px",
  color: "#5C6269",
};

const footerStyle = {
  padding: "20px 25px",
  textAlign: "right",
};

const TaskEditor: React.FC<TaskEditorProps> = ({
  openModal,
  handleClose,
  task,
}) => {
  if (task?.id) {
    return (
      <div>
        <span>{task.name}</span>
      </div>
    );
  }

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <Box sx={headerStyle}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              component="h2"
              sx={headerTitleStyle}
            >
              SHOPPING LIST
            </Typography>
            <div
              className="material-icons"
              style={{ color: "#555F7C", cursor: "pointer" }}
            >
              last_page
            </div>
          </Box>
          <Box sx={contentStyle}>
            <div style={subtitle1Style}>Add an item</div>
            <div style={subtitle2Style}>Add your new item below</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "10px",
                gap: "20px",
              }}
            >
              <TextField
                id="task-name"
                label="Item Name"
                variant="outlined"
                style={{ borderRadius: "4px" }}
              />
              <TextField
                id="task-description"
                label="Description"
                variant="outlined"
                style={{ borderRadius: "4px" }}
                multiline
                rows={5}
                helperText={`0/100`}
              />
              <Autocomplete
                disablePortal
                options={[
                  { label: "1", quantity: 1 },
                  { label: "2", quantity: 2 },
                  { label: "3", quantity: 3 },
                ]}
                renderInput={(params) => (
                  <TextField {...params} label="How many?" />
                )}
                style={{ borderRadius: "4px" }}
              />
            </div>
          </Box>
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
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button variant="contained" style={{ textTransform: "none" }}>
                Add task
              </Button>
            </div>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskEditor;
