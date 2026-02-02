import image from "../../public/assets/images/register.png"
import brandLogo from "../../public/assets/images/brand-brown.png"
import InputAuth from "../components/InputAuth"
import Button from "../components/Button";
import { handleLogin } from "../Auth/login";
import { AiOutlineMail } from "react-icons/ai";
import { MdKey } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login() {
    const {handleSubmit, register, formState} = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    function submitLogin(values) {
        console.log(values)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
            <div className="hidden md:block md:col-span-1">
                <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
            </div>
            <div className="flex items-center justify-center md:col-span-2">
                <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                    <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                    <h1 className="text-2xl font-medium text-shadow-orange-300">Login</h1>
                    <p>Fill out the form correctly</p>
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitLogin)}>
                        <InputAuth type={"email"} id={"email"} label={"Email"} {...register("email")} iconInput={<AiOutlineMail />} placeholder={"Enter Your Email"}/>
                        <InputAuth type={"password"} id={"password"} label={"Password"} {...register("password")} iconInput={<MdKey className="border rounded" />} placeholder={"Enter Your Password"}/>
                        <Button label={"Login"} type={"submit"} variant={"primary"} className={""}/>
                    </form>
                    <p className="flex justify-center gap-2">Not Have An Account? <Link to='/register' className="text-orange-500">Register</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login