import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from "@components/App";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<>Not found</>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
