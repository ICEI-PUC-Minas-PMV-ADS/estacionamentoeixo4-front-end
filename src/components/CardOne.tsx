import { Icon } from "@mui/material";

const CardOne = (props) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {props.count}
          </h4>
          <span className="text-md font-medium">{props.title}</span>
        </div>

        <div className="dark:bg-meta-4' flex h-20 w-20 items-center justify-center rounded-full bg-meta-2">
          <Icon
            component={props.icon}
            style={{ width: "45px", height: "45px" }}
          />
          {/* Ícone de usuário */}
        </div>
      </div>
    </div>
  );
};

export default CardOne;
