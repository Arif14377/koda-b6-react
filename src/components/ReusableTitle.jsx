function ReusableTitle({children}) {
    return (
        <h2 className="font-medium text-4xl [&>span]:text-[#8E6447]">{children}</h2>
    )
}

export default ReusableTitle