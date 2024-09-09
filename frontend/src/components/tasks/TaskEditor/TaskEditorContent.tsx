import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Task, TaskFormInputs, TaskQuantityOption } from "../Tasks.types";
import quantityOptions from "../QuantityOptions";

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

const TaskEditorContent: React.FC<{
  task: Task | null;
  control: Control<TaskFormInputs, unknown>;
}> = ({ task, control }) => (
  <Box sx={contentStyle}>
    <div style={subtitle1Style}>{task ? `Edit an item` : `Add an item`}</div>
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
            helperText={fieldState.error ? fieldState.error.message : ""}
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
                helperText={fieldState.error ? fieldState.error.message : ""}
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
);

export default TaskEditorContent;
