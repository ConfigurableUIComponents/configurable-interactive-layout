// import CustomBarChart from './CustomBarChart';
import WrappedCustomBarChart from './WrappedCustomBarChart';
import DICard from './DataIntegrityCard';

const cardLayoutProperties = [
  {
    i: 'a',
    title: 'Application Data',
    type: 'ReactComponent',
    actions: [
      {
        id: 'DivBy2',
        displayName: 'Divide by 2',
        iconURL: 'trashbin.svg',
      },
      {
        id: 'MulBy2',
        displayName: 'Multiply by 2',
        iconURL: 'refresh.svg',
      },
      {
        id: 'FromConfig',
        displayName: 'From Config',
        iconURL: 'see_all.svg',
        onClick(actionId) { console.log(`Action Id: ${actionId} Card Id: ${this.props.id}`); },
      },
    ],
    Content: WrappedCustomBarChart,
    dataSource: 'card1Data',
    layout: {
      i: 'a', x: 0, y: 0, w: 6, h: 2,
    },
  },
  {
    i: 'b',
    type: 'ReactComponent',
    Content: WrappedCustomBarChart,
    dataSource: 'card2Data',
    listeners: [
      {
        id: 'MulBy2',
      },
    ],
    layout: {
      i: 'b', x: 6, y: 0, w: 6, h: 2, minW: 2, maxW: 8,
    },
  },
  {
    i: 'c',
    title: 'Custom Card Data Listens for DivBy2 events',
    type: 'CustomCard',
    Content: DICard,
    dataSource: 'DIChart1',
    listeners: [
      {
        id: 'DivBy2',
      },
    ],
    layout: {
      i: 'c', x: 0, y: 2, w: 6, h: 4,
    },
  },
  {
    i: 'd',
    type: 'ReactComponent',
    actions: [
      {
        id: 'DivBy2',
        displayName: 'Divide by 2',
        iconURL: 'SV_ANN.svg',
      },
    ],
    Content: WrappedCustomBarChart,
    dataSource: 'card1Data',
    layout: {
      i: 'd', x: 6, y: 2, w: 6, h: 2,
    },
  },
  {
    i: 'e',
    type: 'ReactComponent',
    actions: [
      {
        id: 'DivBy2',
        displayName: 'Divide by 2',
        iconURL: 'SV_ANN.svg',
      },
    ],
    Content: WrappedCustomBarChart,
    dataSource: 'card1Data',
    layout: {
      i: 'e', x: 6, y: 4, w: 6, h: 2,
    },
  },
];

export default cardLayoutProperties;
