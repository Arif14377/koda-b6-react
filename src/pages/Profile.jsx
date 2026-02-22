import { useEffect } from "react";
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
import profilePhoto from "../../public/assets/images/ambassador.png";
import { updateSessionUser } from "../redux/reducers/sessionReducer";
import { updateUserById } from "../redux/reducers/userReducer";

function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.user.user);

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
  }, [sessionUser, reset]);

  const fullName = sessionUser?.name || "-";
  const email = sessionUser?.email || "-";

  function submitProfile(values) {
    if (!sessionUser?.id) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    const hasSameEmail = users.some(
      (item) =>
        item.id !== sessionUser.id &&
        item.email.trim().toLowerCase() === values.email.trim().toLowerCase()
    );

    if (hasSameEmail) {
      alert("Email sudah dipakai user lain.");
      return;
    }

    const sessionChanges = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      address: values.address,
    };

    const userChanges = {
      ...sessionChanges,
      ...(values.password ? { password: values.password } : {}),
    };

    dispatch(updateSessionUser(sessionChanges));
    dispatch(updateUserById({ id: sessionUser.id, changes: userChanges }));
    alert("Profile berhasil diperbarui.");
    reset({ ...values, password: "" });
  }

  return (
    <div className="bg-[#F4F4F4] min-h-screen">
      <Navbar variants={"black"} />

      <main className="pt-30 pb-10 px-6 md:px-20">
        <h1 className="text-5xl font-medium">Profile</h1>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3 border border-[#DDDDDD] bg-[#F4F4F4] p-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl font-medium">{fullName}</h2>
              <p className="text-[#6B7280] mt-2">{email}</p>

              <img
                src={profilePhoto}
                alt="Profile"
                className="w-40 h-40 object-cover rounded-full mt-6"
              />

              <button
                type="button"
                className="mt-6 w-full bg-[#FF8906] text-black py-3 rounded-md font-medium"
              >
                Upload New Photo
              </button>

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
                    className="w-full outline-none bg-transparent text-[#6B7280]"
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
                    className="w-full outline-none bg-transparent text-[#6B7280]"
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
                    className="w-full outline-none bg-transparent text-[#6B7280]"
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
                    className="w-full outline-none bg-transparent text-[#6B7280]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF8906] text-black py-3 rounded-md text-lg font-medium"
              >
                Submit
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
