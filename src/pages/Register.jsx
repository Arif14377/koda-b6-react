import image from "../../public/assets/images/register.png"
import brandLogo from "../../public/assets/images/brand-brown.png"
import InputAuth from "../components/InputAuth"
import { BsPerson } from "react-icons/bs";
import Button from "../components/Button";
import { AiOutlineMail } from "react-icons/ai";
import { MdKey } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

function Register() {
    const [users, setUsers] = useState([])

    const { handleSubmit, register, formState } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            verifPassword: ""
        }

    })

    function submitRegister(values) {
        const pullUser = JSON.parse(localStorage.getItem("users"))
        let newUsers = []
        if (!pullUser) {
            if (values.password !== values.verifPassword) {
                throw new Error("Password tidak match")
            }
            newUsers = [values]

        } else {
            const isExist = pullUser.find(user=>user.email === values.email)

            if(isExist) {
                throw new Error("User sudah terdaftar")
            }

            if (values.password !== values.verifPassword) {
                throw new Error("Password tidak match")
            }

            newUsers = [values, ...pullUser]
        }

        setUsers(newUsers)
        localStorage.setItem("users", JSON.stringify(newUsers))
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
            <div className="hidden md:block md:col-span-1">
                <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
            </div>
            <div className="flex items-center justify-center md:col-span-2">
                <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                    <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                    <h1 className="text-2xl font-medium text-shadow-orange-300">Register</h1>
                    <p>Fill out the form correctly</p>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitRegister)}>
                        <InputAuth type={"text"} id={"name"} label={"Name"} {...register("name")} iconInput={<BsPerson />} placeholder={"Enter Your Full Name"}/>
                        <InputAuth type={"email"} id={"email"} label={"Email"} {...register("email")} iconInput={<AiOutlineMail />} placeholder={"Enter Your Email"}/>
                        <InputAuth type={"password"} id={"password"} label={"Password"} {...register("password")} iconInput={<MdKey className="border rounded" />} placeholder={"Enter Your Password"}/>
                        <InputAuth type={"password"} id={"verifPassword"} label={"Confirm Password"} {...register("verifPassword")} iconInput={<MdKey className="border rounded" />} placeholder={"Enter Your Password Again"}/>
                        <Button label={"Register"} type={"submit"} variant={"primary"} className={""}/>
                    </form>
                    <p className="flex justify-center gap-2">Have An Account? <Link to='/login' className="text-orange-500">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register