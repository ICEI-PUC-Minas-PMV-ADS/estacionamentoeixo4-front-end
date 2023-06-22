import { TextField, styled, InputProps } from "@mui/material";
import React from "react";
import { UseFormRegister } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import InputMask from "react-input-mask";

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
  maxLength?: number;
};

interface InputFormatModel {
  length: number;
  mask: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

//Valor R$
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
  maxLength
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
      inputProps={{ maxLength: maxLength ? maxLength : 100 }}
      InputProps={{
        inputComponent: mask !== "R$" ? React.forwardRef<NumericFormatProps, CustomProps>(
          function TextMaskCNPJ(props, ref) {
            const [value, setValue] = React.useState("");
            const { onChange, ...other } = props;
            return (
              <InputMask
                {...other}
                mask={mask || ""}
                value={value}
                maskChar={""} // Remove os caracteres não preenchidos da máscara
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onChange({
                    target: {
                      name: props.name,
                      value: e.currentTarget.value
                    }
                  })
                  setValue(e.target.value)
                }}
                inputRef={ref as any}
              />
            );
          }
        ) as any : NumericFormatCustom,

        ...InputProps
      }}

      type={type}
    />
  );
};

export default Field;
