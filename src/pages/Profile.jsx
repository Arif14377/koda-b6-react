import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiEyeOff,
  FiKey,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import profilePhoto from "../../assets/images/ambassador.png";
import { updateSessionUser } from "../redux/reducers/sessionReducer";
import { updateUserById } from "../redux/reducers/userReducer";
import http from "../lib/http";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function to get full URL for profile picture
const getProfilePictureUrl = (picturePath) => {
  if (!picturePath) return profilePhoto;
  // If already a full URL, return as is
  if (picturePath.startsWith("http")) return picturePath;
  // If relative path, concat with API base URL
  return `${API_BASE_URL}${picturePath}`;
};

function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const token = useSelector((state) => state.session.token);
  const users = useSelector((state) => state.user.user);

  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePicturePreview, setProfilePicturePreview] = useState(profilePhoto);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const { handleSubmit, register, reset } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      password: "",
    },
  });

  useEffect(() => {
    reset({
      name: sessionUser?.name || "",
      email: sessionUser?.email || "",
      phone: sessionUser?.phone || "",
      address: sessionUser?.address || "",
      password: "",
    });
    
    // Set profile picture from API if available
    if (sessionUser?.picture) {
      setProfilePicturePreview(getProfilePictureUrl(sessionUser.picture));
    }
  }, [sessionUser, reset]);

  // Fetch profile data from API on component mount
  useEffect(() => {
    if (!token || !sessionUser?.id) return;

    const fetchProfile = async () => {
      setFetchLoading(true);
      try {
        const data = await http({
          url: "/users/profile",
          opts: {
            method: "GET",
            token,
          },
        });

        if (data.success) {
          // Update sessionUser with fresh data from API
          const profileData = {
            name: data.results.fullName,
            email: data.results.email,
            phone: data.results.phone,
            address: data.results.address,
            picture: data.results.picture,
          };

          dispatch(updateSessionUser(profileData));
          
          // Update form values
          reset({
            name: data.results.fullName || "",
            email: data.results.email || "",
            phone: data.results.phone || "",
            address: data.results.address || "",
            password: "",
          });

          // Set profile picture
          if (data.results.picture) {
            setProfilePicturePreview(getProfilePictureUrl(data.results.picture));
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        // Don't show error message for fetch on mount
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfile();
  }, [token, sessionUser?.id, dispatch, reset]);

  const fullName = sessionUser?.name || "-";
  const email = sessionUser?.email || "-";

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload profile picture
  async function uploadProfilePicture() {
    if (!profilePicture) {
      setErrorMessage("Pilih file terlebih dahulu.");
      return;
    }

    if (!token) {
      setErrorMessage("Silakan login terlebih dahulu.");
      return;
    }

    setUploadLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("picture", profilePicture);

      const data = await http({
        url: "/users/profile/picture",
        body: formData,
        opts: {
          method: "POST",
          token,
        },
      });

      if (data.success) {
        setSuccessMessage("Foto profil berhasil diupload!");
        setProfilePicture(null);
        
        // Update Redux with new picture
        const updatedUser = {
          ...sessionUser,
          picture: data.results.picture,
        };
        dispatch(updateSessionUser(updatedUser));
        dispatch(updateUserById({ id: sessionUser.id, changes: updatedUser }));
        
        // Update preview with full URL
        setProfilePicturePreview(getProfilePictureUrl(data.results.picture));
      } else {
        setErrorMessage(data.error || "Gagal upload foto.");
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setUploadLoading(false);
    }
  }

  async function submitProfile(values) {
    if (!sessionUser?.id) {
      setErrorMessage("Silakan login terlebih dahulu.");
      return;
    }

    if (!token) {
      setErrorMessage("Token tidak ditemukan. Silakan login kembali.");
      return;
    }

    const hasSameEmail = users.some(
      (item) =>
        item.id !== sessionUser.id &&
        item.email.trim().toLowerCase() === values.email.trim().toLowerCase()
    );

    if (hasSameEmail) {
      setErrorMessage("Email sudah dipakai user lain.");
      return;
    }

    // Only send fields that are not empty
    const profileData = {};
    if (values.name.trim()) profileData.fullName = values.name;
    if (values.email.trim()) profileData.email = values.email;
    if (values.phone.trim()) profileData.phone = values.phone;
    if (values.address.trim()) profileData.address = values.address;

    if (Object.keys(profileData).length === 0) {
      setErrorMessage("Minimal ada satu field yang harus diisi.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const data = await http({
        url: "/users/profile",
        body: profileData,
        opts: {
          method: "PATCH",
          token,
        },
      });

      if (data.success) {
        setSuccessMessage("Profile berhasil diperbarui.");
        
        // Update Redux state
        const sessionChanges = {
          name: data.results.fullName,
          email: data.results.email,
          phone: data.results.phone,
          address: data.results.address,
        };

        // Include picture if it exists
        if (data.results.picture) {
          sessionChanges.picture = data.results.picture;
          setProfilePicturePreview(getProfilePictureUrl(data.results.picture));
        }

        dispatch(updateSessionUser(sessionChanges));
        dispatch(updateUserById({ id: sessionUser.id, changes: sessionChanges }));
        
        reset({ ...values, password: "" });
      } else {
        setErrorMessage(data.error || "Gagal memperbarui profile.");
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Navbar variants={"black"} />

      <main className="pt-30 pb-10 px-6 md:px-20">
        <h1 className="text-5xl font-medium">Profile</h1>

        {/* Loading State */}
        {fetchLoading && (
          <div className="mt-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded">
            Loading profile...
          </div>
        )}

        {/* Global Messages */}
        {errorMessage && (
          <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 border border-[#DDDDDD] bg-[#F4F4F4] p-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl font-medium">{fullName}</h2>
              <p className="text-[#6B7280] mt-2">{email}</p>

              <img
                src={profilePicturePreview}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full mt-6"
              />

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="mt-6 w-full bg-[#FF8906] text-black py-3 rounded-md font-medium hover:bg-[#E67E04] transition"
              >
                {uploadLoading ? "Uploading..." : "Upload New Photo"}
              </button>

              {profilePicture && (
                <div className="mt-4 flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={uploadProfilePicture}
                    disabled={uploadLoading}
                    className="flex-1 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {uploadLoading ? "Uploading..." : "Confirm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setProfilePicture(null);
                      setProfilePicturePreview(
                        sessionUser?.picture
                          ? getProfilePictureUrl(sessionUser.picture)
                          : profilePhoto
                      );
                    }}
                    className="flex-1 bg-gray-400 text-white py-2 rounded-md font-medium hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <p className="text-[#4B5563] mt-5">
                Since <span className="font-medium">20 January 2022</span>
              </p>
            </div>
          </aside>

          <section className="lg:col-span-9 border border-[#DDDDDD] bg-[#F4F4F4] p-6 md:p-10">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(submitProfile)}>
              <div>
                <label className="block text-xl font-medium mb-2">Full Name</label>
                <div className="flex items-center gap-3 border border-[#CDCDCD] rounded-lg px-4 py-3 bg-[#F4F4F4]">
                  <FiUser className="text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("name")}
                    className="w-full outline-none bg-transparent text-[#6B7280] placeholder-[#6B7280]"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-medium mb-2">Email</label>
                <div className="flex items-center gap-3 border border-[#CDCDCD] rounded-lg px-4 py-3 bg-[#F4F4F4]">
                  <FiMail className="text-[#6B7280]" />
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full outline-none bg-transparent text-[#6B7280] placeholder-[#6B7280]"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xl font-medium mb-2">Phone</label>
                <div className="flex items-center gap-3 border border-[#CDCDCD] rounded-lg px-4 py-3 bg-[#F4F4F4]">
                  <FiPhone className="text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("phone")}
                    className="w-full outline-none bg-transparent text-[#6B7280] placeholder-[#6B7280]"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xl font-medium">Password</label>
                  <button type="button" className="text-[#FF8906]">
                    Set New Password
                  </button>
                </div>
                <div className="flex items-center gap-3 border border-[#CDCDCD] rounded-lg px-4 py-3 bg-[#F4F4F4]">
                  <FiKey className="text-[#6B7280]" />
                  <input
                    type="password"
                    placeholder="**********"
                    {...register("password")}
                    className="w-full outline-none bg-transparent text-[#6B7280]"
                  />
                  <FiEyeOff className="text-[#6B7280]" />
                </div>
              </div>

              <div>
                <label className="block text-xl font-medium mb-2">Address</label>
                <div className="flex items-center gap-3 border border-[#CDCDCD] rounded-lg px-4 py-3 bg-[#F4F4F4]">
                  <FiMapPin className="text-[#6B7280]" />
                  <input
                    type="text"
                    {...register("address")}
                    className="w-full outline-none bg-transparent text-[#6B7280] placeholder-[#6B7280]"
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF8906] text-black py-3 rounded-md text-lg font-medium hover:bg-[#E67E04] transition disabled:bg-gray-400"
              >
                {loading ? "Updating..." : "Submit"}
              </button>
            </form>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
