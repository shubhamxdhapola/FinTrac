import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ value, onChange, placeholder, label, type, name }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <label className="text-[13px] text-slate-800">{label}</label>
      <div className="input-box">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full bg-transparent outline-none"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          max={new Date().toISOString().split("T")[0]}
        />

        {type === "password" && (
          <>
            <span
              onClick={togglePassword}
              className="text-primary cursor-pointer"
            >
              {showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
