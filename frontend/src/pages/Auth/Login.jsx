import { use, useEffect, useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateLoginForm } from "../../utils/helper";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/auth.slice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const defaultFormData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const isFormValid = validateLoginForm(formData.email, formData.password);
    if (isFormValid === true) {
      dispatch(loginUser(formData))
        .unwrap()
        .then((res) => {
          toast.success(res.message);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => toast.error(err.message));
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-auto flex flex-col justify-center mx-auto card">
        <h3 className="text-lg md:text-xl font-semibold text-black text-center mb-4">
          FinTrac
        </h3>
        <h3 className="text-lg md:text-xl font-semibold text-slate-800 text-center">
          Welcome Back
        </h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-8 sm:mb-6 text-center">
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={formData.email}
            onChange={handleOnChange}
            placeholder="john@gmail.com"
            label="Email Address"
            type="email"
            name="email"
          />

          <Input
            value={formData.password}
            onChange={handleOnChange}
            placeholder="Enter your password"
            label="Password"
            type="password"
            name="password"
          />

          <button
            type="submit"
            className={`w-full text-sm bg-violet-500 font-medium text-white shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 duration-300 ${
              loading
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer hover:bg-purple-600/15 hover:text-purple-600"
            }`}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto size-5" />
            ) : (
              "LOGIN"
            )}
          </button>

          <p className="text-sm text-slate-800 mt-4 text-center">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
