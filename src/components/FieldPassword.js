import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Field from "./Field";
const PasswordInput = ({ label, register, name, className, }) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (_jsx(Field, { register: register, variant: "filled", type: showPassword ? "text" : "password", name: name, label: label, className: className, InputProps: {
            endAdornment: (_jsx(InputAdornment, { position: "end", children: _jsx(IconButton, { onClick: handleClickShowPassword, edge: "end", children: showPassword ? (_jsx(VisibilityOff, { className: "text-primary" })) : (_jsx(Visibility, { className: "text-primary" })) }) })),
        } }));
};
export default PasswordInput;
