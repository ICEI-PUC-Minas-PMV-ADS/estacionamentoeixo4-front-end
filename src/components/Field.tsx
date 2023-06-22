import { TextField, styled, InputProps } from "@mui/material";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";

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
  mask?: string;
};

interface InputFormatModel {
  length: number;
  mask: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<React.ReactElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const [value, setValue] = React.useState("");
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        defaultValue={value}
        mask="(#00) 000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.currentTarget.value);
        }}
        inputRef={ref}
      />
    );
  }
);

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.floatValue?.toString() || "",
            },
          });
        }}
        thousandSeparator="."
        decimalSeparator=","
        valueIsNumericString
        prefix="R$"
        decimalScale={2}
        fixedDecimalScale
      />
    );
  }
);

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
  mask,
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
  return (
    <CssTextField
      id={id}
      {...register(name)}
      className={className}
      label={label}
      variant={variant}
      onChange={onChange}
      defaultValue={defaultValue}
      InputProps={{
        inputComponent: NumericFormatCustom as any,
      }}
      inputProps={{
        maxLength: 10,
      }}
      type={type}
    />
  );
};

export default Field;
