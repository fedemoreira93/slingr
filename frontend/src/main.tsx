import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppRoutes from "./AppRoutes";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);
