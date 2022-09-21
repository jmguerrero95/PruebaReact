//ENTURAMIENTO HOME
import { Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./home/Home";
export function DashboardRouter() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      </Routes>
    </>
  );
}
