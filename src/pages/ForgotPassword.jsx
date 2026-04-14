import image from "../../assets/images/register.png"
import brandLogo from "../../assets/images/brand-brown.png"
import InputAuth from "../components/InputAuth"
import Button from "../components/Button";
import { AiOutlineMail } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import http from "../lib/http";

export function ForgotPassword() {
    const [error, setError] = useState("")
    const [step, setStep] = useState(1) // 1: email, 2: otp, 3: new password
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const {handleSubmit, register, formState: { errors }, reset, clearErrors} = useForm({
        mode: "onSubmit",
        defaultValues: {
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: ""
        }
    })

    async function submitForgot(values) {
        setError("")
        setLoading(true)

        try {
            if (step === 1) {
                // Generate OTP
                const response = await http({
                    url: "/auth/forgot-password",
                    body: { email: values.email }
                })
                setEmail(values.email)
                setStep(2)
                // Reset form untuk step berikutnya
                reset({ email: "", code: "", newPassword: "", confirmPassword: "" }, { keepValues: false })
                clearErrors()
            } else if (step === 2) {
                // Verifikasi OTP
                const response = await http({
                    url: "/auth/forgot-password/verifikasi-otp",
                    body: {
                        email: email,
                        code: parseInt(values.code)
                    }
                })
                setStep(3)
                reset({ email: "", code: "", newPassword: "", confirmPassword: "" }, { keepValues: false })
                clearErrors()
            } else if (step === 3) {
                // Change Password
                if (values.newPassword !== values.confirmPassword) {
                    setError("Password tidak cocok")
                    setLoading(false)
                    return
                }

                const response = await http({
                    url: "/auth/forgot-password/change",
                    body: {
                        email: email,
                        newPassword: values.newPassword,
                        confirmPassword: values.confirmPassword
                    },
                    opts: { method: "PATCH" }
                })
                setSuccess(true)
                setError("")
            }
        } catch (err) {
            setError(err.message || "Terjadi kesalahan, silakan coba lagi")
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
                <div className="hidden md:block md:col-span-1">
                    <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
                </div>
                <div className="flex items-center justify-center md:col-span-2">
                    <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                        <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h2 className="text-green-800 font-semibold mb-2">Berhasil!</h2>
                            <p className="text-green-700">Password Anda berhasil diperbarui. Silakan login dengan password baru Anda.</p>
                        </div>
                        <a href="/login" className="text-blue-600 hover:text-blue-800 underline">
                            Kembali ke halaman login
                        </a>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
            <div className="hidden md:block md:col-span-1">
                <img src={image} alt={"coffee in nature"} className="h-screen w-full object-cover" />
            </div>
            <div className="flex items-center justify-center md:col-span-2">
                <div className="w-4/5 md:w-3/5 p-auto flex flex-col gap-4">
                    <img src={brandLogo} alt="logo coffee shop" className="w-fit"/>
                    
                    {step === 1 && (
                        <>
                            <p>Masukkan email Anda untuk melanjutkan</p>
                            <form typeof="submit" method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit(submitForgot)}>
                                <InputAuth 
                                    type={"email"} 
                                    id={"email"} 
                                    label={"Email"} 
                                    {...register("email", { 
                                        required: "Email harus diisi",
                                        onChange: () => setError("") 
                                    })} 
                                    iconInput={<AiOutlineMail />} 
                                    placeholder={"Enter Your Email"}
                                />
                                {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
                                {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                                <Button 
                                    label={loading ? "Mengirim..." : "Kirim OTP"} 
                                    type={"submit"} 
                                    variant={"primary"} 
                                    disabled={loading}
                                />
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <p>Kode OTP telah dikirimkan ke {email}. Silakan masukkan kode tersebut.</p>
                            <form typeof="submit" method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit(submitForgot)}>
                                <InputAuth 
                                    type={"text"} 
                                    id={"code"} 
                                    label={"Kode OTP"} 
                                    {...register("code", { 
                                        required: "Kode OTP harus diisi",
                                        onChange: () => setError("") 
                                    })} 
                                    placeholder={"Masukkan 6 digit kode"}
                                />
                                {errors.code && <p className="text-sm text-red-600">{errors.code.message}</p>}
                                {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                                <Button 
                                    label={loading ? "Verifikasi..." : "Verifikasi OTP"} 
                                    type={"submit"} 
                                    variant={"primary"}
                                    disabled={loading}
                                />
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setStep(1)
                                        setError("")
                                        reset({ email: "", code: "", newPassword: "", confirmPassword: "" }, { keepValues: false })
                                        clearErrors()
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Kembali
                                </button>
                            </form>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <p>Masukkan password baru Anda</p>
                            <form typeof="submit" method="POST" className="flex flex-col gap-4" onSubmit={handleSubmit(submitForgot)}>
                                <InputAuth 
                                    type={"password"} 
                                    id={"newPassword"} 
                                    label={"Password Baru"} 
                                    {...register("newPassword", { 
                                        required: "Password harus diisi",
                                        minLength: {value: 6, message: "Password minimal 6 karakter"},
                                        onChange: () => setError("") 
                                    })} 
                                    placeholder={"Masukkan password baru"}
                                />
                                {errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
                                <InputAuth 
                                    type={"password"} 
                                    id={"confirmPassword"} 
                                    label={"Konfirmasi Password"} 
                                    {...register("confirmPassword", { 
                                        required: "Konfirmasi password harus diisi",
                                        onChange: () => setError("") 
                                    })} 
                                    placeholder={"Masukkan ulang password"}
                                />
                                {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>}
                                {error && <p className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}
                                <Button 
                                    label={loading ? "Menyimpan..." : "Simpan Password Baru"} 
                                    type={"submit"} 
                                    variant={"primary"}
                                    disabled={loading}
                                />
                                <button 
                                    type="button"
                                    onClick={() => {
                                        setStep(2)
                                        setError("")
                                        reset({ email: "", code: "", newPassword: "", confirmPassword: "" }, { keepValues: false })
                                        clearErrors()
                                    }}
                                    className="text-sm text-gray-600 hover:text-gray-800"
                                >
                                    Kembali
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
