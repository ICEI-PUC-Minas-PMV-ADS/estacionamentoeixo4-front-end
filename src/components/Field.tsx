import { TextField, styled, InputProps } from "@mui/material";

type TProps = {
  label?: string;
  id?: string;
  variant: "filled" | "outlined" | "standard";
  type?: React.InputHTMLAttributes<unknown>["type"];
  className?: React.InputHTMLAttributes<unknown>["className"];
  props?: InputProps;
};

const Field = ({ id, label, variant, props, type, className }: TProps) => {
  const CssTextField = styled(TextField)({
    ".MuiInputBase-root": {
      paddingLeft: "2px",
      backgroundColor: "white",
      borderTopLeftRadius: "0.5rem",
      borderTopRightRadius: "0.5rem",
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
    <CssTextField
      id={id}
      className={className}
      label={label}
      variant={variant}
      InputProps={props}
      type={type}
    />
  );
};

export default Field;
