import React, { useState } from "react";
import { IconButton, InputAdornment, InputProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UseFormRegister } from "react-hook-form";
import Field from "./Field";

interface PasswordInputProps {
  label?: string;
  id?: string;
  name: string;
  variant?: "filled" | "outlined" | "standard";
  type?: React.InputHTMLAttributes<unknown>["type"];
  className?: React.InputHTMLAttributes<unknown>["className"];
  defaultValue?: React.InputHTMLAttributes<unknown>["defaultValue"];
  onChange?: React.InputHTMLAttributes<unknown>["onChange"];
  InputProps?: InputProps;
  register: UseFormRegister<{ [key: string]: string | number }>;
}

const PasswordInput = ({
  label,
  register,
  name,
  className,
}: PasswordInputProps): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const handleMouseDownPassword = (
  //   event: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   event.preventDefault();
  // };

  return (
    <Field
      register={register}
      variant="filled"
      type={showPassword ? "text" : "password"}
      name={name}
      label={label}
      className={className}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              // onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff className="text-primary" />
              ) : (
                <Visibility className="text-primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
