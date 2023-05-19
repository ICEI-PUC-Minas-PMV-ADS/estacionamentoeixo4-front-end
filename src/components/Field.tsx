import { TextField, styled, InputProps } from "@mui/material";
import { UseFormRegister } from "react-hook-form";

export type TypeForm = {
  [key: string]: string | number;
};
type TProps = {
  label?: string;
  id?: string;
  name: string;
  variant: "filled" | "outlined" | "standard";
  type?: React.InputHTMLAttributes<unknown>["type"];
  className?: React.InputHTMLAttributes<unknown>["className"];
  defaultValue?: React.InputHTMLAttributes<unknown>["defaultValue"];
  onChange?: React.InputHTMLAttributes<unknown>["onChange"];
  InputProps?: InputProps;
  register: UseFormRegister<{ [key: string]: string | number }>;
};

const Field = ({
  id,
  label,
  variant,
  type,
  name,
  className,
  defaultValue,
  InputProps,
  onChange,
  register,
}: TProps) => {
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
  return (
    <CssTextField
      id={id}
      {...register(name)}
      className={className}
      label={label}
      variant={variant}
      onChange={onChange}
      defaultValue={defaultValue}
      InputProps={InputProps}
      type={type}
    />
  );
};

export default Field;
