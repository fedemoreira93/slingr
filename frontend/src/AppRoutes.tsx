import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>Home</>} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
