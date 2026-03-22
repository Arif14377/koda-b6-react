function Button({label, type, variant, className, onClick, disabled}) {
    const base = "w-full p-3 cursor-pointer rounded"
    const variants = {
        primary: "bg-orange-500 text-black hover:bg-orange-600",
        outline: "border border-black text-black hover:bg-black hover:text-white",
    }
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : ""

    return(
        <button 
            className={`${base} ${variants[variant]} ${className} ${disabledClass}`} 
            type={type} 
            onClick={onClick}
            disabled={disabled}
        >
            {label}
        </button>
    )
}

export default Button