import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./Pages/ProtectedRoute"
import Layout from "./Pages/Layout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import ErrorPage from "./Pages/ErrorPage"
import SignupPage from "./Pages/SignupPage"
import ForgottenPasswordpage from "./Pages/ForgottenPasswordPage"

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
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route
            path="/auth/forgotten-password"
            element={<ForgottenPasswordpage />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
