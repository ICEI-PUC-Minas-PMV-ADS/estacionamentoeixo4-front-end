import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Component } from "react";

type TState = {
  series: ApexOptions["series"];
  options: ApexOptions;
};

class ChartFour extends Component<any, Partial<TState>> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          data: [
            168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123,
            212, 270, 190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115,
            290, 380, 312,
          ],
        },
      ],
      options: {
        colors: ["#3C50E0"],
        chart: {
          fontFamily: "Satoshi, sans-serif",
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 2,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 4,
          colors: ["transparent"],
        },
        xaxis: {
          categories: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23",
            "24",
            "25",
            "26",
            "27",
            "28",
            "29",
            "30",
          ],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        legend: {
          show: true,
          position: "top",
          horizontalAlign: "left",
          fontFamily: "inter",

          markers: {
            radius: 99,
          },
        },
        yaxis: {
          show: false,
        },
        grid: {
          yaxis: {
            lines: {
              show: false,
            },
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          x: {
            show: false,
          },
          y: {
            title: {
              formatter(val: string): string {
                return val;
              },
            },
          },
        },
      },
    };
  }
  render() {
    return (
      <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div>
          <h3 className="text-xl font-semibold text-black dark:text-white">
            Visitors Analytics
          </h3>
        </div>

        <div className="mb-2">
          <div id="chartFour" className="-ml-5">
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ChartFour;
