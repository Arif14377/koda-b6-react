import image from "../assets/images/register.png"
import brandLogo from "../assets/images/brand-brown.png"
import InputAuth from "../components/InputAuth"
import Button from "../components/Button";
import { handleLogin } from "../Auth/login";
import { AiOutlineMail } from "react-icons/ai";

export function ForgotPassword() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
            <div className="hidden md:block md:col-span-1">
                <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
            </div>
            <div className="flex items-center justify-center md:col-span-2">
                <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                    <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                    <p>We will send new password to your email</p>
                    <form typeof="submit" className="flex flex-col gap-4" onSubmit={handleLogin}>
                        <InputAuth type={"email"} id={"email"} label={"Email"} name={"email"} iconInput={<AiOutlineMail />} placeholder={"Enter Your Email"}/>
                        <Button label={"Submit"} type={"submit"} variant={"primary"} className={""}/>
                    </form>
                </div>
            </div>
        </div>
    )
}