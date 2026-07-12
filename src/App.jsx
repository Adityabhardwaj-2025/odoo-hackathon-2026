import { useState } from "react";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import AssetsPage from "./components/AssetsPage";
import EmployeesPage from "./components/EmployeePage";
import {
  login,
  signup,
  forgotPassword,
} from "./services/authService";

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [currentPage, setCurrentPage] = useState("/dashboard");

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await login(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async ({ email, password }) => {
    setLoading(true);
    setErrorMessage("");

    try {
      await signup(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      setErrorMessage("Enter email first");
      return;
    }

    try {
      await forgotPassword(email);
      alert("Password reset email sent.");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

if (isLoggedIn) {
  switch (currentPage) {
  case "/dashboard":
    return (
      <DashboardPage onNavigate={setCurrentPage} />
    );

  case "/assets":
    return (
      <AssetsPage onNavigate={setCurrentPage} />
    );

  case "/employees":
    return (
      <EmployeesPage onNavigate={setCurrentPage} />
    );

  default:
    return (
      <DashboardPage onNavigate={setCurrentPage} />
    );
}
}

  return (
    <LoginPage
      onLogin={handleLogin}
      onSignup={handleSignup}
      onForgotPassword={handleForgotPassword}
      isLoading={loading}
      errorMessage={errorMessage}
    />
  );
}

export default App;