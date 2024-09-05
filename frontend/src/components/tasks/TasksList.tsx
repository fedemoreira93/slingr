import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EmptyTasks from "./EmptyTasks";
import TaskEditor from "./TaskEditor";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/store";
import { fetchTasks } from "@reducers/tasksSlice";

const StyledTasksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const TasksList: React.FC = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state: RootState) => state.tasks);

  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleShowTaskPopup = (): void => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
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
        <EmptyTasks onClick={handleShowTaskPopup} />
        <TaskEditor
          openModal={openModal}
          handleClose={() => {
            setOpenModal(false);
          }}
          task={undefined}
        />
      </StyledTasksContainer>
    </Box>
  );
};

export default TasksList;
