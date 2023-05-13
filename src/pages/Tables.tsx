import Breadcrumb from "../components/Breadcrumb";
import TableOne from "../components/TableOne";
import TableTwo from "../components/TableTwo";
import TableThree from "../components/TableComponent";

const Tables = () => {
  return (
    <div className="w-full h-full">
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </div>
  );
};

export default Tables;
