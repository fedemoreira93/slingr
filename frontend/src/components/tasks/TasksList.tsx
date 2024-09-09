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

const TasksList: React.FC<TasksProps> = ({ tasks, toggleShowPopup }) => {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState<number[]>([]);
  const [openDeleteTaskPopup, setOpenDeleteTaskPopup] =
    useState<boolean>(false);
  const [deleteTask, setDeleteTask] = useState<number | null>(null);

  const handleDeleteTask = (id: number | undefined): void => {
    if (!id) {
      return;
    }

    setDeleteTask(id);
  };

  const handleEditTask = (id: number | undefined): void => {
    if (!id) {
      return;
    }

    const findedTask = tasks?.find((task) => task.id === id);

    if (findedTask) {
      toggleShowPopup(findedTask);
    }
  };

  const handleSelectTask = (id: number | undefined): void => {
    if (!id) {
      return;
    }

    if (selected.includes(id)) {
      setSelected(selected.filter((taskId) => taskId !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const isSelected = (id: number | undefined) => {
    return id ? selected.includes(id) : false;
  };

  const isPurchased = (task: Task) => {
    return task.purchased;
  };

  return (
    <StyledTasks>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Your Items</span>
          <Button
            variant="contained"
            style={{ textTransform: "none" }}
            onClick={() => {
              toggleShowPopup(null);
            }}
          >
            Add item
          </Button>
        </div>
        {tasks?.map((task) => {
          const selected = isSelected(task.id);
          const purchased = isPurchased(task);

          return (
            <StyledTask
              key={`task-${task.id}`}
              style={{
                border: !selected ? "0.5px solid #d5dfe9" : "unset",
                background: selected ? "rgba(213, 223, 233, 0.17)" : "unset",
              }}
            >
              <div style={{ display: "flex", padding: "20px 10px" }}>
                <div style={{ paddingRight: "10px" }}>
                  <Checkbox
                    id={`task-${task.id}-selected`}
                    checked={selected}
                    onChange={() => {
                      handleSelectTask(task.id);
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    width: "100%",
                    textDecoration: purchased ? "line-through" : "unset",
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
                    onClick={() => {
                      handleEditTask(task.id);
                    }}
                  >
                    edit
                  </div>
                  <div
                    className="material-icons-outlined"
                    style={{ color: "#555F7C", cursor: "pointer" }}
                    onClick={() => {
                      handleDeleteTask(task.id);
                      setOpenDeleteTaskPopup(true);
                    }}
                  >
                    delete
                  </div>
                </div>
              </div>
            </StyledTask>
          );
        })}
      </div>
      <Dialog
        open={openDeleteTaskPopup}
        onClose={() => {
          setOpenDeleteTaskPopup(false);
        }}
      >
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDeleteTaskPopup(false);
            }}
            style={{ textTransform: "none", color: "#2A323C" }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (deleteTask) {
                dispatch({ type: REMOVE_TASK_REQUEST, payload: deleteTask });
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

export default TasksList;
