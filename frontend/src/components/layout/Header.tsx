import React from "react";
import { useDispatch } from "react-redux";
import { FETCH_TASKS_REQUEST } from "@actionTypes/tasksTypes";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 75px;
  background: #4d81b7;
  color: #ffffff;
  font-family: "Dosis", sans-serif;
  font-size: 1.25em;
  font-weight: bold;
  text-align: center;
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: FETCH_TASKS_REQUEST });
  };

  return (
    <StyledHeader>
      <div style={{ padding: "30px", cursor: "pointer" }} onClick={handleClick}>
        SHOPPING LIST
      </div>
    </StyledHeader>
  );
};

export default Header;
