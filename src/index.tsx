import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/custom.less";

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
