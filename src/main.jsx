import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const node = document.querySelector("#root");
createRoot(node).render(<App />);
