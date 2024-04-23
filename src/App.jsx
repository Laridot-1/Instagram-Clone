import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./Pages/ProtectedRoute"
import Layout from "./Pages/Layout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import ErrorPage from "./Pages/ErrorPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
