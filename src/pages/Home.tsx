import Breadcrumb from "@src/components/Breadcrumb";
import About from "./About";
import Logo from "@images/logo/logo.png";
import ChartFour from "@src/components/ChartFour";
import ChartOne from "@src/components/ChartOne";
import ChartTwo from "@src/components/ChartTwo";
import ChartThree from "@src/components/ChartThree";
const Home = () => {
  return (
    <div className="h-full w-full">
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12">
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </div>
  );
};

export default Home;
