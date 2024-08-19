import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const usePasswordVisibility = () => {
    const [isRevealPassword, setIsRevealPassword] = useState(false)

    const toggleIcon = isRevealPassword ? <FaEye /> : <FaEyeSlash />
    const passwordType = isRevealPassword ? "text" : "password"

    const togglePasswordVisibility = () => {
        setIsRevealPassword(!isRevealPassword)
    }

    return {passwordType, toggleIcon, togglePasswordVisibility}

}

export default usePasswordVisibility;