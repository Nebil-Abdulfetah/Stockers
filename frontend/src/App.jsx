import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import RedirectLogin from "./components/RedirectLogin";
import Stocks from "./pages/Stocks/Stocks";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Stocks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectLogin>
              <Login />
            </RedirectLogin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
