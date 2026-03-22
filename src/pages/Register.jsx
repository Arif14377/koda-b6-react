import image from "../../public/assets/images/register.png";
import brandLogo from "../../public/assets/images/brand-brown.png";
import InputAuth from "../components/InputAuth";
import { BsPerson } from "react-icons/bs";
import Button from "../components/Button";
import { AiOutlineMail } from "react-icons/ai";
import { MdKey } from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import SsoSign from "../components/SosialSignButton.jsx";
import { FaFacebook } from "react-icons/fa6";
import http from "../lib/http.js";

function Register() {
  // const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      id: null,
      name: "",
      email: "",
      password: "",
      verifPassword: "",
      phone: "",
      address: "",
      role: "user",
    },
  });

  async function submitRegister(values) {
    if (values.password !== values.verifPassword) {
      setError("Password tidak sama.");
      return;
    }

    setError("");
    try {
      await http(
        {       
          url: "/auth/register",
          body: {
            fullName: values.name,
            email: values.email,
            password: values.password,
          },
          opts: { method: "POST" },
        }
      );
      alert("Registrasi berhasil.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Registrasi gagal");
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
      <div className="hidden md:block md:col-span-1 h-full">
        <img
          src={image}
          alt={"coffee in nature"}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-center md:col-span-2">
        <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
          <img src={brandLogo} alt="logo coffee shop" className="w-fit" />
          <h1 className="text-2xl font-medium text-shadow-orange-300">
            Register
          </h1>
          <p>Fill out the form correctly</p>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(submitRegister)}
          >
            <InputAuth
              type={"text"}
              id={"name"}
              label={"Name"}
              {...register("name", { onChange: () => setError("") })}
              iconInput={<BsPerson />}
              placeholder={"Enter Your Full Name"}
            />
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
            <InputAuth
              type={"password"}
              id={"verifPassword"}
              label={"Confirm Password"}
              {...register("verifPassword", { onChange: () => setError("") })}
              iconInput={<MdKey className="border rounded" />}
              placeholder={"Enter Your Password Again"}
            />
            <Button
              label={"Register"}
              type={"submit"}
              variant={"primary"}
              className={""}
            />
          </form>
          <p className="flex justify-center gap-2">
            Have An Account?{" "}
            <Link to="/login" className="text-orange-500">
              Login
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

export default Register;
