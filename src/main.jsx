import { createRoot } from "react-dom/client"

import App from "./App"
import { Context } from "./Context"
import { BrowserRouter } from "react-router-dom"

import "./index.css"

const node = document.querySelector("#root")
createRoot(node).render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
)
