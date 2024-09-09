import React, { useState } from "react";
import styled from "styled-components";
import { Task, TasksProps } from "./Tasks.types";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { REMOVE_TASK_REQUEST } from "@actionTypes/tasksTypes";

const StyledTasks = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  min-width: 300px;
  height: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
`;

const StyledTask = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TaskTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
`;

const TaskDescription = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #7d7a7a;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0px 10px 0px;
`;

const TaskList: React.FC<TasksProps> = ({ tasks, toggleShowPopup }) => {
  const dispatch = useDispatch();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openDeleteTaskPopup, setOpenDeleteTaskPopup] =
    useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const handleDeleteTask = (id: number) => {
    if (id) {
      setTaskToDelete(id);
      setOpenDeleteTaskPopup(true);
    }
  };

  const handleEditTask = (task: Task) => {
    toggleShowPopup(task);
  };

  const handleSelectTask = (id: number) => {
    if (id) {
      setSelectedIds((prevSelectedIds) =>
        prevSelectedIds.includes(id)
          ? prevSelectedIds.filter((taskId) => taskId !== id)
          : [...prevSelectedIds, id]
      );
    }
  };

  const isSelected = (id: number) => selectedIds.includes(id);
  const isPurchased = (task: Task) => task.purchased;

  return (
    <StyledTasks>
      <Header>
        <span>Your Items</span>
        <Button
          variant="contained"
          style={{ textTransform: "none" }}
          onClick={() => toggleShowPopup(null)}
        >
          Add item
        </Button>
      </Header>
      {tasks?.map((task) => (
        <StyledTask
          key={task.id}
          style={{
            border: isSelected(task.id) ? "unset" : "0.5px solid #d5dfe9",
            background: isSelected(task.id)
              ? "rgba(213, 223, 233, 0.17)"
              : "unset",
          }}
        >
          <div style={{ display: "flex", padding: "20px 10px" }}>
            <Checkbox
              checked={isSelected(task.id)}
              onChange={() => handleSelectTask(task.id)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                width: "100%",
                textDecoration: isPurchased(task) ? "line-through" : "unset",
              }}
            >
              <TaskTitle>{task.name}</TaskTitle>
              <TaskDescription>{task.description}</TaskDescription>
            </div>
            <div
              style={{
                display: "flex",
                height: "100%",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: "20px",
                paddingRight: "20px",
              }}
            >
              <div
                className="material-icons-outlined"
                style={{ color: "#555F7C", cursor: "pointer" }}
                onClick={() => handleEditTask(task)}
              >
                edit
              </div>
              <div
                className="material-icons-outlined"
                style={{ color: "#555F7C", cursor: "pointer" }}
                onClick={() => handleDeleteTask(task.id)}
              >
                delete
              </div>
            </div>
          </div>
        </StyledTask>
      ))}
      <Dialog
        open={openDeleteTaskPopup}
        onClose={() => setOpenDeleteTaskPopup(false)}
      >
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDeleteTaskPopup(false)}
            style={{ textTransform: "none", color: "#2A323C" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (taskToDelete) {
                dispatch({ type: REMOVE_TASK_REQUEST, payload: taskToDelete });
                setOpenDeleteTaskPopup(false);
              }
            }}
            variant="contained"
            style={{ textTransform: "none" }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </StyledTasks>
  );
};

export default TaskList;
