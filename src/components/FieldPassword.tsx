// import React, { useState } from "react";
// import { IconButton, InputAdornment } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { UseFormRegister } from "react-hook-form";
// import Field from "./Field";

// type FieldPassword = {
//   [key: string]: string | number;
// };
// interface PasswordInputProps {
//   label: string;
//   register: UseFormRegister<FieldPassword>;
//   name: string;
//   className?: React.InputHTMLAttributes<unknown>["className"];
// }

// const PasswordInput = ({
//   label,
//   register,
//   name,
//   className,
// }: PasswordInputProps) => {
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   return (
//     <Field
//       variant="filled"
//       name={name}
//       type={showPassword ? "text" : "password"}
//       register={register}
//       label={label}
//       className={className}
//       InputProps={{
//         endAdornment: (
//           <InputAdornment position="end">
//             <IconButton
//               onClick={handleClickShowPassword}
//               onMouseDown={handleMouseDownPassword}
//               edge="end"
//             >
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </IconButton>
//           </InputAdornment>
//         ),
//       }}
//     />
//   );
// };

// export default PasswordInput;
import React, { useState } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UseFormRegister } from "react-hook-form";
import Field from "./Field";

interface PasswordInputProps {
  label: string;
  register: UseFormRegister<{ [key: string]: string | number }>;
  name: string;
  className?: React.InputHTMLAttributes<unknown>["className"];
}

const PasswordInput = ({
  label,
  register,
  name,
  className,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
