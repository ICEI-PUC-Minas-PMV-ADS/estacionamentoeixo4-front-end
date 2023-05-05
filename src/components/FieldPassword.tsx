import {
  FormControl,
  IconButton,
  InputAdornment,
  InputBaseComponentProps,
  InputLabel,
  OutlinedInput,
  styled,
} from "@mui/material";
import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
type TProps = {
  label?: string;
  id?: string;
  variant: "filled" | "outlined" | "standard";
  type?: React.InputHTMLAttributes<unknown>["type"];
  className?: React.InputHTMLAttributes<unknown>["className"];
  props?: InputBaseComponentProps;
};

const FieldPassword = ({ className, id, label, props }: TProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const Field = styled(OutlinedInput)({
    ".MuiInputBase-root": {
      paddingLeft: "2px",
      backgroundColor: "white",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
      color: "#000000",
    },

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
    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <Field
        id={id}
        className={className}
        type={showPassword ? "text" : "password"}
        inputProps={props}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
    </FormControl>
  );
};

export default FieldPassword;
