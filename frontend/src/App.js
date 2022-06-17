import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserHomeScreen from "./components/UserHomeScreen";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserHomeScreen />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;

// Abcd@1234
