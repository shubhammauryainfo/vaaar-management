import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageTitle from "./components/PageTitle";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the root URL */}
        <Route path="/" element={<LoginPage />} />
       <Route path="/dashboard" element={
          <>
          <PageTitle title="Dashboard | Vaaar Trust" />
          <Dashboard/>
        </>
        } />

      </Routes>
    </Router>
  );
};

export default App;
