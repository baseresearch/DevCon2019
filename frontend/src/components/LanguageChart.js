import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Legend,
} from 'bizcharts';

const tooltipTpl = `
  <li>
    <span style="background-color:{color};" class="g2-tooltip-marker"></span>
    {name}: {value}
  </li>
`;

function getLangType(lang) {
  switch (lang) {
    case 'en':
      return 'English';
    case 'my':
      return 'Myanmar (Unicode)';
    case 'my_zg':
      return 'Myanmar (Zawgyi)';
    default:
      return 'Others';
  }
}

const GenderChart = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  const [chartCols, setChartCols] = useState([]);

  useEffect(() => {
    const entries = data.map((entry) => ({
      item: getLangType(entry.language),
      count: entry.count,
    }));

    setChartData(entries);

    const chartColCount = [
      {
        count: {
          formatter: val => val,
        },
      }
    ];

    setChartCols(chartColCount);
  }, [data]);

  return (
    <Chart
      height={250}
      data={chartData}
      scale={chartCols}
      padding={[ 10, 40, 10, 10 ]}
      forceFit
    >
      <Coord type="theta" radius={1} innerRadius={0.6} />
      <Axis name="count" />
      <Legend
        position="right"
        offsetY={-250 / 2 + 120}
        offsetX={-100}
      />
      <Tooltip
        showTitle={false}
        itemTpl={tooltipTpl}
      />
      <Geom
        type="intervalStack"
        color="item"
        position="count"
      ></Geom>
    </Chart>
  );
};

export default GenderChart;
