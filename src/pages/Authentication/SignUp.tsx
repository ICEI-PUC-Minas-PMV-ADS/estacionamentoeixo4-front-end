/* eslint-disable no-debugger */
import { Link } from "react-router-dom";
import ComponentAuth from "./ComponentAuth";
import Field, { TypeForm } from "../../components/Field";
import { InputAdornment } from "@mui/material";
import Email from "@mui/icons-material/Email";
import Person from "@mui/icons-material/Person";
import { useForm, useWatch } from "react-hook-form";
import PasswordInput from "../../components/FieldPassword";

const SignUp = () => {
  const { register, handleSubmit, control } = useForm<TypeForm>({
    defaultValues: {
      password: "",
      passwordRepeat: "",
    },
  });

  const pass = useWatch({
    control,
    name: "password",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <ComponentAuth title="Cadastre-se">
      <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <div className="relative">
            <Field
              register={register}
              name="name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className="mr-1">
                    <Person className="text-primary" />
                  </InputAdornment>
                ),
              }}
              variant="filled"
              label="Email"
              className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
            />
          </div>
        </div>
        <div className="mb-2">
          <Field
            register={register}
            name="email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className="mr-1">
                  <Email className="text-primary" />
                </InputAdornment>
              ),
            }}
            variant="filled"
            label="Email"
            className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
          />
        </div>
        <div className="mb-2">
          <div className="relative">
            <PasswordInput
              name={"password"}
              register={register}
              label="Password"
              className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
            />
          </div>
        </div>
        <div className="mb-3">
          <div className="relative">
            <PasswordInput
              register={register}
              name={"passwordRepeat"}
              label="Repita a senha"
              className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
            />
          </div>
        </div>
        <div className="mb-2">
          <input
            type="submit"
            value="Criar conta"
            className="w-full p-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
          />
        </div>
        <div className="pb-8 mt-3 text-center">
          <p>
            Ja tem uma conta?{" "}
            <Link to="/auth/signin" className="text-primary">
              Sign in
            </Link>
          </p>
        </div>
        {pass}
      </form>
    </ComponentAuth>
  );
};

export default SignUp;
