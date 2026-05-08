import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import TrackingPublico from "./pages/TrackingPublico";
import Dashboard from "./pages/Dashboard";
import Envios from "./pages/Envios";
import NuevoEnvio from "./pages/NuevoEnvio";
import DetalleEnvio from "./pages/DetalleEnvio";
import Sucursales from "./pages/Sucursales";
import Usuarios from "./pages/Usuarios";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/rastrear" element={<TrackingPublico />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/envios"
            element={
              <PrivateRoute>
                <Layout>
                  <Envios />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/envios/nuevo"
            element={
              <PrivateRoute>
                <Layout>
                  <NuevoEnvio />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/envios/:id"
            element={
              <PrivateRoute>
                <Layout>
                  <DetalleEnvio />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/sucursales"
            element={
              <AdminRoute>
                <Layout>
                  <Sucursales />
                </Layout>
              </AdminRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <AdminRoute>
                <Layout>
                  <Usuarios />
                </Layout>
              </AdminRoute>
            }
          />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
