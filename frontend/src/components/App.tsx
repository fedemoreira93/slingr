import React from "react";
import Header from "@components/layout/Header";
import Layout from "./layout/Layout";
import TasksContainer from "./tasks/TasksContainer";

const App: React.FC = () => {
  return (
    <Layout>
      <Header />
      <TasksContainer />
    </Layout>
  );
};

export default App;
