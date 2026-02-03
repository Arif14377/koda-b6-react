import image from "../../public/assets/images/register.png"
import brandLogo from "../../public/assets/images/brand-brown.png"
import InputAuth from "../components/InputAuth"
import Button from "../components/Button";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";

export function ForgotPassword() {
    const [error, setError] = useState("")
    const {handleSubmit, register, formState} = useForm({
        defaultValues: {
            email: ""
        }
    })

    function submitForgot(values) {
        const pullUser = JSON.parse(localStorage.getItem("users")) || []
        const isExist = pullUser.find(user => user.email.trim().toLowerCase() === values.email.trim().toLowerCase())
        // console.log(values)
        if (!isExist) {
            setError("Email tidak terdaftar")
            return
        } else {
            alert("Link reset password telah dikirimkan ke alamat email Anda.")
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
            <div className="hidden md:block md:col-span-1">
                <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
            </div>
            <div className="flex items-center justify-center md:col-span-2">
                <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                    <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                    <p>We will send new password to your email</p>
                    <form typeof="submit" method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit(submitForgot)}>
                        <InputAuth type={"email"} id={"email"} label={"Email"} {...register("email", { onChange: () => setError("") })} iconInput={<AiOutlineMail />} placeholder={"Enter Your Email"}/>
                        {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                        <Button label={"Submit"} type={"submit"} variant={"primary"} className={""}/>
                    </form>
                </div>
            </div>
        </div>
    )
}