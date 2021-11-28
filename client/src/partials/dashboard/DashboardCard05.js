import React, { useState, useEffect } from "react";
import Info from "../../utils/Info";
import RealtimeChart from "../../charts/RealtimeChart";

// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";

function DashboardCard05() {
  // IMPORTANT:
  // Code below is for demo purpose only, and it's not covered by support.
  // If you need to replace dummy data with real data,
  // refer to Chart.js documentation: https://www.chartjs.org/docs/latest

  // Fake real-time data
  const [counter, setCounter] = useState(0);
  const [range, setRange] = useState(35);

  // Dummy data to be looped
  let data = [];
  let labels = [];

  const [slicedData, setSlicedData] = useState([]);
  const [slicedLabels, setSlicedLabels] = useState([]);

  // Fake update every 2 seconds
  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/api");
    eventSource.onmessage = (event) => {
      data.push(JSON.parse(event.data).data);
      labels.push(JSON.parse(event.data).time);
      setSlicedData(data.length > 35 ? data.slice(data.length - range, data.length) : data);
      setSlicedLabels(labels.length > 35 ? labels.slice(labels.length - range, labels.length) : labels);
      setCounter(counter + 1);
      console.log("HI")
      console.log(JSON.parse(event.data));
    };
  }, [counter]);


  const chartData = {
    labels: slicedLabels,
    datasets: [
      // Indigo line
      {
        data: slicedData,
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-gray-200">
      <header className="px-5 py-4 border-b border-gray-100 flex items-center">
        <h2 className="font-semibold text-gray-800">Real Time Value</h2>
        <Info className="ml-2" containerClassName="min-w-44">
          <div className="text-sm text-center">
            {timeDifference(new Date(), new Date(slicedLabels[slicedLabels.length - 1]))}
          </div>
        </Info>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}
function timeDifference(date1,date2) {
  var difference = date1.getTime() - date2.getTime();

  var secondsDifference = Math.floor(difference/1000);
  var millisecondsDifference = difference - secondsDifference*1000;

  return ('delay = ' + secondsDifference + ' second/s ' + millisecondsDifference + ' millisecond/s');
}
export default DashboardCard05;
