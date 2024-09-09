import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  Task,
  TaskEditorProps,
  TaskFormInputs,
  TaskQuantityOption,
} from "./Tasks.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import quantityOptions from "./QuantityOptions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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
  justifyContent: "left",
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
  toggleShowPopup,
  task,
}) => {
  const dispatch = useDispatch();

  const { control, handleSubmit, reset } = useForm<TaskFormInputs>({
    defaultValues: {
      taskName: "",
      taskDescription: "",
      taskQuantity: 0,
      taskPurchased: false,
    },
  });

  useEffect(() => {
    reset({
      taskName: task?.name || "",
      taskDescription: task?.description || "",
      taskQuantity: task?.quantity || 0,
      taskPurchased: task?.purchased || false,
    });
  }, [task, reset]);

  const onSubmit: SubmitHandler<TaskFormInputs> = (data) => {
    const newTask: Task = {
      id: task?.id || undefined,
      name: data.taskName,
      description: data.taskDescription,
      quantity: data.taskQuantity,
      purchased: data.taskPurchased,
      deleted: false,
    };
    dispatch({
      type: task?.id ? "EDIT_TASK_REQUEST" : "ADD_TASK_REQUEST",
      payload: newTask,
    });
    toggleShowPopup(null);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        toggleShowPopup(null);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ minWidth: "300px" }}
    >
      <Box sx={modalStyle}>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
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
              <div style={subtitle1Style}>
                {task ? `Edit an item` : `Add an item`}
              </div>
              <div style={subtitle2Style}>
                {task ? `Edit your item below` : `Add your new item below`}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingTop: "10px",
                  gap: "15px",
                }}
              >
                <Controller
                  name="taskName"
                  control={control}
                  rules={{ required: "Task name is required" }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      id="task-name"
                      placeholder="Item Name"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : ""
                      }
                      style={{ borderRadius: "4px" }}
                    />
                  )}
                />
                <Controller
                  name="taskDescription"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 100,
                      message: "Description cannot exceed 100 characters",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      id="task-description"
                      placeholder="Description"
                      variant="outlined"
                      style={{ borderRadius: "4px" }}
                      multiline
                      rows={5}
                      error={!!fieldState.error}
                      helperText={`${field.value.length}/100${
                        fieldState.error ? ` | ${fieldState.error.message}` : ""
                      }`}
                    />
                  )}
                />
                <Controller
                  name="taskQuantity"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete<TaskQuantityOption>
                      disablePortal
                      options={quantityOptions}
                      getOptionLabel={(option) => option.label}
                      value={
                        quantityOptions.find(
                          (option) => option.quantity === field.value
                        ) || null
                      }
                      onChange={(_, newValue) =>
                        field.onChange(newValue?.quantity || null)
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="How many?"
                          error={!!fieldState.error}
                          helperText={
                            fieldState.error ? fieldState.error.message : ""
                          }
                        />
                      )}
                      style={{ borderRadius: "4px" }}
                    />
                  )}
                />
                {task && (
                  <Controller
                    name="taskPurchased"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        style={{
                          color: "#9CA8B4",
                        }}
                        control={
                          <Checkbox
                            {...field}
                            id="task-purchased"
                            style={{
                              display: "flex",
                              justifyContent: "left",
                              color: "#9CA8B4",
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                            checked={field.value}
                          />
                        }
                        label={"Purchased"}
                      />
                    )}
                  />
                )}
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
                  onClick={() => {
                    reset();
                    toggleShowPopup(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ textTransform: "none" }}
                >
                  {task ? `Save Item` : `Add task`}
                </Button>
              </div>
            </Box>
          </form>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskEditor;
