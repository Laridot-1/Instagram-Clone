import { createRoot } from "react-dom/client"

import App from "./App"
import { Context } from "./Context"

import "./index.css"

const node = document.querySelector("#root")
createRoot(node).render(
  <Context>
    <App />
  </Context>
)
