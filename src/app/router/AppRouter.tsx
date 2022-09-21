import { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import { AuthRouter } from "../components/auth/AuthRouter";
import { DashboardRouter } from "../components/dashboard/DashboardRouter";
import { AuthContext } from "../components/store/contexts/AuthContext";
import { PrivateRouter } from "./PrivateRouter";
import { Home } from "../components/dashboard/home/Home";

interface Context {
  dispatchUser?: any;
  user?: User;
}

interface User {
  loggedIn: boolean;
}

const ProtectedRouter = ({ dat }: any) => {
  if (dat) {
    return <Home />;
  }
  return <Navigate to="/auth" replace />;
};

export function AppRouter() {
  const { user }: Context = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRouter />} />
        <Route path="/" element={<ProtectedRouter dat={user?.loggedIn} />} />
        <Route
          path="/dashboard/home"
          element={<ProtectedRouter dat={user?.loggedIn} />}
        />
      </Routes>
    </Router>
  );
}
