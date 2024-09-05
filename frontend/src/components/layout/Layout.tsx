import React from "react";
import styled from "styled-components";

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
};

export default Layout;
