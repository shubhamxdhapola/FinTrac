import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/Inputs/Input";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";
import { validateSingUpForm } from "../../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../../redux/slices/auth.slice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const defaultFormData = {
    fullName: "",
    email: "",
    password: "",
    profileImage: null,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const { loading } = useSelector((state) => state.auth);
  const { uploading } = useSelector((state) => state.upload);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const isFormValid = validateSingUpForm(
      formData.fullName,
      formData.email,
      formData.password
    );

    if (isFormValid == true) {
      dispatch(registerUser(formData))
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
      <div className="h-auto flex flex-col justify-center card">
        <h3 className="text-lg md:text-xl font-semibold text-black text-center mb-4">
          FinTrac
        </h3>
        <h3 className=" sm:text-lg font-semibold text-slate-800 text-center">
          Create an Account
        </h3>
        <p className="text-sm text-slate-700 mt-[5px] mb-8 sm:mb-6 text-center">
          Join us today by entering your details below
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector setFormData={setFormData} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={formData.fullName}
              onChange={handleOnChange}
              placeholder="John Doe"
              label="Full Name"
              type="text"
              name="fullName"
            />

            <Input
              value={formData.email}
              onChange={handleOnChange}
              placeholder="john@gmail.com"
              label="Email Address"
              type="email"
              name="email"
            />
            <div className="md:col-span-2">
              <Input
                value={formData.password}
                onChange={handleOnChange}
                placeholder="Create a password"
                label="Password"
                type="password"
                name="password"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full text-sm bg-violet-500 font-medium text-white shadow-lg shadow-purple-600/5 p-[10px] rounded-md my-1 duration-300 ${
              loading || uploading
                ? "cursor-not-allowed opacity-80"
                : "cursor-pointer hover:bg-purple-600/15 hover:text-purple-600"
            }`}
            disabled={loading || uploading}
          >
            {uploading ? (
              "Uploading Image"
            ) : loading ? (
              <Loader2 className="animate-spin mx-auto size-5" />
            ) : (
              "SIGN UP"
            )}
          </button>

          <p className="text-sm text-slate-800 mt-4 text-center">
            Already have an account ?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
