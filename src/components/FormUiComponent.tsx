// import * as React from "react";
// import { IMaskInput } from "react-imask";
// import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Field from "./Field";
import { useForm } from "react-hook-form";
import { IForm } from "./CrudComponent";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// interface CustomProps {
//   onChange: (event: { target: { name: string; value: string } }) => void;
//   name: string;
// }

// const TextMaskCustom = React.forwardRef<React.ReactElement, CustomProps>(
//   function TextMaskCustom(props, ref) {
//     const [value, setValue] = React.useState("");
//     const { onChange, ...other } = props;
//     return (
//       <IMaskInput
//         {...other}
//         defaultValue={value}
//         mask="(#00) 000-0000"
//         definitions={{
//           "#": /[1-9]/,
//         }}
//         onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
//           setValue(e.currentTarget.value);
//         }}
//         inputRef={ref}
//       />
//     );
//   }
// );

// const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
//   function NumericFormatCustom(props, ref) {
//     const { onChange, ...other } = props;
//     return (
//       <NumericFormat
//         {...other}
//         getInputRef={ref}
//         onValueChange={(values) => {
//           onChange({
//             target: {
//               name: props.name,
//               value: values.value,
//             },
//           });
//         }}
//         thousandSeparator
//         valueIsNumericString
//         prefix="$"
//       />
//     );
//   }
// );

export interface IProps {
  model: object;
  title: string;
  service: string;
  fields: IForm[];
}

const FormUiComponent = ({ model, title, service, fields }: IProps) => {
  const [modelState, setModelState] = useState({});
  const [titleState, setTitleState] = useState("Undefined");
  const [serviceState, setServiceState] = useState("");
  const [fieldsState, setFieldsState] = useState<IForm[]>([]);

  const axios = new AxiosRequest();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{
    [key: string]: any;
  }>({
    defaultValues: { ...modelState },
  });
  const mutationCrud = useMutation<any, Error, any>({
    mutationKey: ["crud_mutation"],
    mutationFn: async (data) => await axios.post({ url: serviceState, data }),
  });

  const fnGetPathUrl = () => {
    const [_barra, path, _lixo] = service.split("/");
    return path;
  };

  useEffect(() => {
    setModelState(model);
    setTitleState(title);
    setServiceState(service);
    setFieldsState(fields || []);
  }, [model, title, service, fields]);

  // Fazz o parser do objeto para mandar corretamente
  const modelParser = (data) => {
    const objParser = {};
    Object.keys(data).map((item) => {
      if (item === "cnpj") {
        objParser[item] = data[item];
      } else {
        // Verifica se  é number
        const onlyNumbers = new RegExp("^[0-9]+$");
        if (onlyNumbers.test(data[item])) {
          //Verifica se é decimal
          objParser[item] = Number(data[item]);
        } else {
          //String
          objParser[item] = data[item];
        }
      }
    });
    return objParser;
  };

  const onSubmit = async (data: any) => {
    const dataParser = modelParser(data);
    console.log(data);
    await mutationCrud
      .mutateAsync({ ...dataParser })
      .then((result) => {
        console.log(result);
        navigate(`/dashboard/${fnGetPathUrl()}/read`);
      })
      .catch((err) => {
        throw new Error("Algo aconteceu de errado" + err);
      });
  };

  return (
    <div className="flex items-center justify-center w-full h-auto px-4">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full h-auto p-12 px-20 border rounded-md gap-y-4 border-bodydark2 "
      >
        <h1 className="text-2xl font-bold font-satoshi ">
          Cadastro do {titleState}
        </h1>
        {fieldsState.length !== 0 ? (
          fieldsState?.map((item, index) => {
            //Monta a row se o typeField for igual a row e alimenta com as childrens
            if (item.typeField === "row" || item.typeField === "field") {
              return (
                <>
                  {
                    item.typeField === "field" && <h1 className="mr-auto left-0 text-1xl font-satoshi font-semibold">{item.placeholder}</h1>
                  }
                  <div
                    key={index}
                    className={`grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-${item.cols} lg:grid-cols-${item.cols} xl:gap-x-8`}
                  >

                    {
                      item.childrens?.map((child, indexChild) => {
                        return (
                          (child.typeField === "text" ||
                            child.typeField === "number") && (
                            <Field
                              key={indexChild}
                              type={child.typeField}
                              name={child.bind as string}
                              register={register}
                              variant="filled"
                              label={child.placeholder}
                              className="w-full py-3 pl-6 pr-10 text-black border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none"
                            />
                          )
                        )
                      })
                    }
                  </div>
                </>);
            }

            // if (item.typeField === "text") {
            //   return Field;
            // }
          })
        ) : (
          <h1 className="text-2xl"></h1>
        )}
        {/* <Field
        register={register}
        className="w-full text-black"
        label="react-maskformat"
        // onChange={handleChange}
        name={"maskformat"}
        id="formatted-maskformat-input"
        InputProps={{
          inputComponent: TextMaskCustom as never,
        }}
        variant="filled"
      />
      <Field
        register={register}
        className="text-black"
        label="react-number-format"
        // defaultValue={values.numberformat}
        // onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as never,
        }}
        variant="filled"
      />
      <h1>{watch("numberformat")}</h1>
      <h1>{watch("maskformat")}</h1> */}

        <button
          type="submit"
          className="mt-8 w-[220px]  cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white hover:bg-opacity-90"
        >
          Cadastrar
        </button>
      </Box >
    </div >
  );
};
export default FormUiComponent;
