import React from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  StackingColumnSeries,
  Tooltip,
  Highlight
} from "@syncfusion/ej2-react-charts";

import { useStateContext } from "../../contexts/ContextProvider";

const StackedChart = ({ width, height, xAxisData, yAxisData, data }) => {
  const { currentMode } = useStateContext(); /* getting the current active mode (dark/light) from contexts */
  
  return (
    <ChartComponent
      width={width}
      height={height}
      id="charts"
      primaryXAxis={xAxisData}
      primaryYAxis={yAxisData}
      chartArea={{ border: { width: 0 } }}
      tooltip={{ enable: true, fill: `${currentMode === "Dark" ? "#fff" : "#33373E"}`, textStyle: { color: `${currentMode === "Dark" ? "#33373E" : "#fff"}` } }}
      /* 👇changing the legend text color acc. to theme mode(dark/light) */
      legendSettings={{ textStyle: {color: `${currentMode === "Dark" ? "#fff" : "#33373E"}` } }}
      /* 👇changing the background color of whole chart acc. to theme mode(dark/light) */
      background={currentMode === "Dark" ? "#33373E" : "#fff"}
    >
      <Inject services={[Legend, Category, StackingColumnSeries, Tooltip, Highlight]} />
      <SeriesCollectionDirective>
        {data.map((item, index) => (
          <SeriesDirective key={index} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default StackedChart;
