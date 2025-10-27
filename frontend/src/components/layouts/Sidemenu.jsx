import { useDispatch, useSelector } from "react-redux";
import { SIDE_MENU_DATA } from "../../utils/data";
import { logoutUser } from "../../redux/slices/auth.slice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProfilePlaceholder from "../ProfilePlaceholder";
import { LuSettings, LuSettings2 } from "react-icons/lu";
import { Settings } from "lucide-react";

function Sidemenu({ activeMenu }) {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (route) => {
    if (route == "/logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = async () => {
    dispatch(logoutUser())
      .unwrap()
      .then((message) => {
        toast.success(message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mb-7">
        {user?.profileImage ? (
          <img
            src={user?.profileImage || ""}
            alt="profile-image"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <ProfilePlaceholder fullName={user?.fullName} />
        )}

        <h5 className="text-gray-950 font-medium leading-6 ">
          {user?.fullName || ""}
        </h5>
      </div>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 cursor-pointer ${
            activeMenu != item.label && "hover:bg-gray-100"
          } duration-300`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Sidemenu;
