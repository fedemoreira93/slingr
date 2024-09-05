import React from "react";
import Header from "@components/layout/Header";
import Layout from "./layout/Layout";
import TasksList from "./tasks/TasksList";

const App: React.FC = () => {
  return (
    <Layout>
      <Header title={"SHOPPING LIST"} />
      <TasksList />
    </Layout>
  );
};

export default App;
