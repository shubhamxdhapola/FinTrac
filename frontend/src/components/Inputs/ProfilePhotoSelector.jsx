import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage } from "../../redux/slices/upload.slice";

const ProfilePhotoSelector = ({ setFormData }) => {
  const [profilePic, setProfilePic] = useState(null);
  const { uploading } = useSelector((state) => state.upload);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      dispatch(uploadImage(formData))
        .unwrap()
        .then((profileImage) => {
          setProfilePic(profileImage);
          setFormData((prevData) => ({
            ...prevData,
            profileImage,
          }));
          toast.success("Image updated successfully");
        })
        .catch((err) => toast.error(err));
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setProfilePic(null);
    setFormData((prevData) => ({
      ...prevData,
      profileImage: null,
    }));
    toast.success("Image removed successfully");
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!profilePic ? (
        <div className="w-22 h-22 flex items-center justify-center bg-purple-100 rounded-full relative">
          <LuUser className="text-4xl text-primary" />
          <button
            className={`w-8 h-8 flex items-center justify-center bg-primary ${
              uploading || loading
                ? "opacity-80 cursor-not-allowed"
                : "cursor-pointer hover:bg-primary/80"
            } text-white rounded-full absolute bottom-1 -right-2 duration-300`}
            type="button"
            onClick={onChooseFile}
            disabled={uploading || loading}
          >
            {uploading ? <Loader2 className="animate-spin" /> : <LuUpload />}
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={profilePic}
            alt="profile-photo"
            className="w-22 h-22 rounded-full object-cover"
          />
          <button
            className={`w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-1 -right-2  duration-300 ${
              loading ? "cursor-not-allowed opacity-80" : "cursor-pointer hover:bg-red-600"
            }`}
            type="button"
            onClick={handleRemoveImage}
            disabled={loading}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
