import { BsPerson } from "react-icons/bs";

function InputAuth({id, label, iconInput, type, placeholder}) {
    return (
        <div>
            <label htmlFor={id} className="font-medium">{label}</label>
            <div className="flex border border-gray-400 bg-gray-50 rounded items-center p-3 gap-2">
                {iconInput}
                <input type={type} id={id} name={name} placeholder={placeholder} className="outline-none h-full w-full"/>
            </div>
        </div>
    )
}

export default InputAuth