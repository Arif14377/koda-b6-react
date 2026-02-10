import image from "../../public/assets/images/register.png";
import brandLogo from "../../public/assets/images/brand-brown.png";
import InputAuth from "../components/InputAuth";
import Button from "../components/Button";
import { AiOutlineMail } from "react-icons/ai";
import { MdKey } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import SsoSign from "../components/SosialSignButton.jsx";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/sessionReducer.js";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function submitLogin(values) {
    const pullUser = JSON.parse(localStorage.getItem("users")) || [];
    const existUser = pullUser.find(
      (user) =>
        user.email.trim().toLowerCase() === values.email.trim().toLowerCase(),
    );
    console.log(existUser);
    if (!existUser) {
      setError("Email tidak terdaftar");
      return;
    }
    if (existUser.password !== values.password) {
      setError("Password salah");
      return;
    }

    alert("Login berhasil.");
    setError("");
    dispatch(login(existUser));
    navigate("/");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      <div className="hidden md:block md:col-span-1">
        <img
          src={image}
          alt={"coffee in nature"}
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center md:col-span-2">
        <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
          <img src={brandLogo} alt="logo coffee shop" className="w-fit" />
          <h1 className="text-2xl font-medium text-shadow-orange-300">Login</h1>
          <p>Fill out the form correctly</p>
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitLogin)}
          >
            <InputAuth
              type={"email"}
              id={"email"}
              label={"Email"}
              {...register("email", { onChange: () => setError("") })}
              iconInput={<AiOutlineMail />}
              placeholder={"Enter Your Email"}
            />
            <InputAuth
              type={"password"}
              id={"password"}
              label={"Password"}
              {...register("password", { onChange: () => setError("") })}
              iconInput={<MdKey className="border rounded" />}
              placeholder={"Enter Your Password"}
            />
            <Link to="/forgot-password" className="text-sm justify-self-end">
              Forgot Password
            </Link>
            <Button
              label={"Login"}
              type={"submit"}
              variant={"primary"}
              className={""}
            />
          </form>
          <p className="flex justify-center gap-2">
            Not Have An Account?{" "}
            <Link to="/register" className="text-orange-500">
              Register
            </Link>
          </p>
          <div
            className={
              "flex flex-col md:flex-row w-full items-center md:justify-between gap-4"
            }
          >
            <SsoSign>
              <FaFacebook color={"#395185"} />
              Facebook
            </SsoSign>
            <SsoSign>
              <FcGoogle />
              Google
            </SsoSign>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
