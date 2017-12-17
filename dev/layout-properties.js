import CustomBarChart from './CustomBarChart';

const cardLayoutProperties = [
  {
    i: 'a',
    title: 'Bar Chart #1',
    content: CustomBarChart,
    data: {
      values: [
        { x: 'A', y: 5 },
        { x: 'B', y: 9 },
        { x: 'C', y: 2 },
        { x: 'D', y: 4 },
      ],
      xAxisAttrName: 'x',
      yAxisAttrName: 'y',
      yAxisLabel: 'Count',
    },
    layout: {
      i: 'a', x: 0, y: 0, w: 6, h: 3,
    },
  },
  {
    i: 'b',
    displayHeader: false,
    content: CustomBarChart,
    data: {
      values: [
        { x: 'X', y: 30 },
        { x: 'Y', y: 20 },
        { x: 'Z', y: 45 },
      ],
      xAxisAttrName: 'x',
      yAxisAttrName: 'y',
      yAxisLabel: 'Count',
    },
    layout: {
      i: 'b', x: 6, y: 0, w: 6, h: 3, minW: 2, maxW: 8,
    },
  },
  {
    i: 'c',
    title: 'Bar Chart #3',
    content: CustomBarChart,
    data: {
      values: [
        { x: 'AB', y: 5 },
        { x: 'CD', y: 16 },
        { x: 'EF', y: 26 },
        { x: 'GH', y: 34 },
        { x: 'IJ', y: 45 },
        { x: 'KL', y: 57 },
        { x: 'MN', y: 72 },
        { x: 'OP', y: 93 },
        { x: 'QR', y: 63 },
        { x: 'ST', y: 42 },
        { x: 'UV', y: 18 },
        { x: 'WX', y: 5 },
        { x: 'YZ', y: 2 },
      ],
      xAxisAttrName: 'x',
      yAxisAttrName: 'y',
      yAxisLabel: 'Count',
    },
    layout: {
      i: 'c', x: 0, y: 1, w: 12, h: 3,
    },
  },
];

export default cardLayoutProperties;
