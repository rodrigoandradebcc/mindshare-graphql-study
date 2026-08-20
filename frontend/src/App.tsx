import { Route, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProtectedRoute, PublicRoute } from "@/components/AuthRoutes";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { IdeasPage } from "./pages/ideas";
import { Members } from "./pages/members";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <IdeasPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <Members />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
