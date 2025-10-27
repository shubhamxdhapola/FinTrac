import React from "react";
import { getInitials } from "../utils/helper";

const ProfilePlaceholder = ({ fullName }) => {
  return (
    <div
      className={`flex justify-center items-center rounded-full text-gray-900 font-medium bg-gray-100 w-20 h-20 text-xl`}
    >
      {getInitials(fullName)}
    </div>
  );
};

export default ProfilePlaceholder;
