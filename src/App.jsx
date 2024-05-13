import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import Layout from "./Layout/Layout"
import HomePage from "./Pages/HomePage"
import LoginPage from "./Pages/LoginPage"
import ErrorPage from "./Pages/ErrorPage"
import SignupPage from "./Pages/SignupPage"
import AuthLayout from "./Layout/AuthLayout"
import CompleteSignupPage from "./Pages/CompleteSignupPage"
import ForgottenPasswordpage from "./Pages/ForgottenPasswordPage"
import ProfilePage from "./Pages/ProfilePage"

import "react-loading-skeleton/dist/skeleton.css"
import { useGlobalContext } from "./Context"

const App = () => {
  const { user } = useGlobalContext()

  const canGoToHomePage = user || JSON.parse(localStorage.getItem("user"))

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={canGoToHomePage ? <HomePage /> : <Navigate to="/accounts" />}
        />
        <Route path="user/:uid" element={<ProfilePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      <Route path="accounts" element={<AuthLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="complete-signup" element={<CompleteSignupPage />} />
        <Route path="forgotten-password" element={<ForgottenPasswordpage />} />
      </Route>
    </Routes>
  )
}
export default App
