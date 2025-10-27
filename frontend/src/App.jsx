import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserInfo } from "./redux/slices/auth.slice";
import ProtectedRoute from "./components/ProtectedRoute";
import { Loader } from "lucide-react";
import AuthRoutes from "./components/AuthRoutes";

const App = () => {
  const { authenticating } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  if (authenticating)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="">
      <Toaster
        toastOptions={{
          style: { fontSize: "14px", fontFamily: "inherit" },
          success: { iconTheme: { primary: "#875cf5" } },
        }}
      />
      <Router>
        <Routes>
          {/* Default route */}
          <Route path="/" element={<Root />} />

          {/* AuthRoutes */}
          <Route element={<AuthRoutes />}>
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
