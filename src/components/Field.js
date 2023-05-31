import { jsx as _jsx } from "react/jsx-runtime";
import { TextField, styled } from "@mui/material";
const Field = ({ id, label, variant, type, name, className, defaultValue, InputProps, onChange, register, }) => {
    const CssTextField = styled(TextField)({
        ".MuiInputBase-root": {
            paddingLeft: "2px",
            backgroundColor: "white",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
            color: "#8A99AF",
        },
        color: "#8A99AF",
        // input label when focused
        "& label.Mui-focused": {
            color: "#5E5CE5",
        },
        "& .MuiInput-underline:before": {
            color: "#5E5CE5",
            backgroundColor: "white",
        },
        // focused color for input with variant='standard'
        "& .MuiInput-underline:after": {
            borderBottomColor: "#5E5CE5",
        },
        // focused color for input with variant='filled'
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: "#5E5CE5",
        },
        "& .MuiFilledInput": {
            backgroundColor: "#fff",
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: "#5E5CE5",
            },
            "&.Mui-hover fieldset": {
                borderColor: "#5E5CE5",
            },
        },
    });
    return (_jsx(CssTextField, { id: id, ...register(name), className: className, label: label, variant: variant, onChange: onChange, defaultValue: defaultValue, InputProps: InputProps, type: type }));
};
export default Field;
