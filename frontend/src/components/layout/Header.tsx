import React from "react";
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

interface HeaderData {
  title: string;
}

const Header: React.FC<HeaderData> = ({ title }) => {
  return (
    <StyledHeader>
      <div style={{ padding: "30px", cursor: "default" }}>{title}</div>
    </StyledHeader>
  );
};

export default Header;
