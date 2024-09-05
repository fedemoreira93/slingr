import React from "react";
import styled from "styled-components";
import EmptyTasks from "./EmptyTasks";

const StyledTasksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const handleShowAddTaskPopup = (): void => {
  alert("Button clicked!");
};

const TasksList: React.FC = () => {
  return (
    <StyledTasksContainer>
      <EmptyTasks onClick={handleShowAddTaskPopup} />
    </StyledTasksContainer>
  );
};

export default TasksList;
