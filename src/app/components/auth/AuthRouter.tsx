import { Route, Routes } from "react-router-dom";
import Login from "./login/Login";
//RUTA LOGIN
export function AuthRouter() {
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
