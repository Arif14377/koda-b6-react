function Button({label, type, variant, className}) {
    const base = "w-full p-3 cursor-pointer rounded"
    const variants = {
        primary: "bg-orange-500 text-black hover:bg-orange-600",
        outline: "border border-black text-black hover:bg-black hover:text-white",
    }

    return(
        <button className={`${base} ${variants[variant]} ${className}`} type={type}>{label}</button>
    )
}

export default Button