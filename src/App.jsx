import { BrowserRouter, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./Pages/ProtectedRoute"
import Layout from "./Layout/Layout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import ErrorPage from "./Pages/ErrorPage"
import SignupPage from "./Pages/SignupPage"
import AuthLayout from "./Layout/AuthLayout"
import CompleteSignupPage from "./Pages/CompleteSignupPage"
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
          <Route path="*" element={<ErrorPage />} />
        </Route>

        <Route path="accounts" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="complete-signup"
            element={
              <ProtectedRoute>
                <CompleteSignupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="forgotten-password"
            element={<ForgottenPasswordpage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
