import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./login/Login";

export function AuthRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
