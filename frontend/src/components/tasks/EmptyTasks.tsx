import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import { TasksProps } from "./Tasks.types";

const StyledEmptyTasks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 40%;
  height: 35%;
  padding: 20px;
  border: 1px solid #c6c6c6;
  border-radius: 5px;
  box-sizing: border-box;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #87898c;
`;

const EmptyTasks: React.FC<TasksProps> = ({ onClick }) => {
  return (
    <StyledEmptyTasks>
      <span>Your shopping list is empty :(</span>
      <Button
        variant="contained"
        style={{ textTransform: "none" }}
        onClick={onClick}
      >
        Add your first item
      </Button>
    </StyledEmptyTasks>
  );
};

export default EmptyTasks;
