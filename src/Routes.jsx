import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ClosingStatementGeneration from "./pages/closing-statement-generation";
import AdminDashboard from "./pages/admin-dashboard";
import MovieManagerDashboard from "./pages/movie-manager-dashboard";
import ExhibitorPortal from "./pages/exhibitor-portal";
import LoginPage from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/closing-statement-generation"
              element={<ClosingStatementGeneration />}
            />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route
              path="/movie-manager-dashboard/:movie_id?"
              element={<MovieManagerDashboard />}
            />
            <Route path="/exhibitor-portal" element={<ExhibitorPortal />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
