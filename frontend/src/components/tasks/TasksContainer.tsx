import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EmptyTasks from "./EmptyTasks";
import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import TasksList from "./TasksList";
import TaskEditor from "./TaskEditor";
import { Task } from "./Tasks.types";
import useNotifications from "@hooks/useNotifications";

const StyledTasksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TasksContainer: React.FC = () => {
  const dispatch = useDispatch();

  const { loading, tasks, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const {
    snackbarOpen,
    snackbarMessage,
    snackbarSeverity,
    handleCloseSnackbar,
    showSnackbar,
  } = useNotifications();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch({ type: "FETCH_TASKS_REQUEST" });
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showSnackbar(error);
    }
  }, [error, showSnackbar]);

  const toggleShowPopup = (task: Task | null): void => {
    setEditingTask(task || null);
    setOpenModal(!openModal);
  };

  return (
    <Box sx={{ position: "relative", height: "100%", overflowY: "auto" }}>
      {loading && (
        <Backdrop
          sx={{
            background: "#FFFFFF",
            color: "#4d81b7",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          open={true}
        >
          <CircularProgress color="inherit" size={80} thickness={2} />
        </Backdrop>
      )}
      <StyledTasksContainer>
        {!loading && !tasks.length ? (
          <EmptyTasks toggleShowPopup={toggleShowPopup} />
        ) : (
          !loading && (
            <TasksList
              tasks={tasks.filter((t) => !t.deleted)}
              toggleShowPopup={toggleShowPopup}
            />
          )
        )}
      </StyledTasksContainer>
      <TaskEditor
        openModal={openModal}
        toggleShowPopup={toggleShowPopup}
        task={editingTask}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust as needed
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TasksContainer;
