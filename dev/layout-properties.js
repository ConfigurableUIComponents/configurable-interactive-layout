import CustomBarChart from './CustomBarChart';
import DICard from './DataIntegrityCard';

const cardLayoutProperties = [
  {
    i: 'a',
    title: 'Bar Chart #1',
    actions: [
      {
        id: 'DivBy2',
        displayName: 'Divide by 2',
      },
      {
        id: 'MulBy2',
        displayName: 'Multiply by 2',
      },
    ],
    Content: CustomBarChart,
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
    title: 'Card Data From Application',
    Type: DICard,
    Content: CustomBarChart,
    layout: {
      i: 'b', x: 6, y: 0, w: 6, h: 3, minW: 2, maxW: 8,
    },
  },
  {
    i: 'c',
    title: 'Card Data From Custom Card',
    Type: DICard,
    Content: CustomBarChart,
    dataSource: 'DIChart1',
    listeners: [
      {
        id: 'DivBy2',
      },
    ],
    layout: {
      i: 'c', x: 0, y: 1, w: 12, h: 3,
    },
  },
];

export default cardLayoutProperties;
