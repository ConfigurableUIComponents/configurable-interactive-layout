import CustomBarChart from './CustomBarChart';
import WrappedCustomBarChart from './WrappedCustomBarChart';
import DICard from './DataIntegrityCard';

const cardLayoutProperties = [
  {
    i: 'a',
    title: 'Application Data',
    actions: [
      {
        id: 'DivBy2',
        displayName: 'Divide by 2',
        iconURL: 'actions_collapsed.svg',
      },
      {
        id: 'MulBy2',
        displayName: 'Multiply by 2',
        iconURL: 'actions_collapsed.svg',
      },
      {
        id: 'FromConfig',
        displayName: 'From Config',
        iconURL: 'https://imagejournal.org/wp-content/uploads/bb-plugin/cache/23466317216_b99485ba14_o-panorama.jpg',
        // onClick(actionId) { console.log(`Action Id: ${actionId} Card Id: ${this.props.id}`); },
        onClick(actionId) { console.log(`liron${{ actionId }}`); },
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
    title: 'Application Data Listens for MulBy2 events',
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
