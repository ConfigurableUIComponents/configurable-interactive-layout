import CustomBarChart from './CustomBarChart';
import WrappedCustomBarChart from './WrappedCustomBarChart';
import DICard from './DataIntegrityCard';

const cardLayoutProperties = {
  config: [
    {
      i: 'a',
      title: 'Component A (default: 8x6)',
      actions: [
        {
          id: 'DivBy2',
          displayName: 'Divide by 2',
          iconURL: 'SV_ANN.svg',
        },
        {
          id: 'MulBy2',
          displayName: 'Multiply by 2',
          // iconURL: 'SV_ANN.svg',
        },
        {
          id: 'FromConfig',
          displayName: 'From Config',
          iconURL: 'SV_ANN.svg',
          onClick(actionId) { console.log(`Action Id: ${actionId} Card Id: ${this.props.id}`); },
        },
      ],
      Content: WrappedCustomBarChart,
      dataSource: 'card1Data',
    },
    {
      i: 'b',
      title: 'Component B (default: 2x2)',
      Content: WrappedCustomBarChart,
      dataSource: 'card2Data',
      listeners: [
        {
          id: 'MulBy2',
        },
      ],
    },
    {
      i: 'c',
      title: 'Component C (default: 2x4)',
      Content: WrappedCustomBarChart,
      dataSource: 'card2Data',
    },
    {
      i: 'd',
      title: 'Component D (default: 2x2)',
      Type: DICard,
      Content: CustomBarChart,
      dataSource: 'DIChart1',
      listeners: [
        {
          id: 'DivBy2',
        },
      ],
    },
    {
      i: 'e',
      title: 'Component E (default: 4x2)',
      actions: [
        {
          id: 'DivBy2',
          displayName: 'Divide by 2',
          iconURL: 'SV_ANN.svg',
        },
      ],
      Content: WrappedCustomBarChart,
      dataSource: 'card1Data',
    },
    {
      i: 'f',
      title: 'Component F (default: 10x2)',
      actions: [
        {
          id: 'DivBy2',
          displayName: 'Divide by 2',
          iconURL: 'SV_ANN.svg',
        },
      ],
      Content: WrappedCustomBarChart,
      dataSource: 'card1Data',
    },
    {
      i: 'g',
      title: 'Component G (default: 2x2)',
      actions: [
        {
          id: 'DivBy2',
          displayName: 'Divide by 2',
          iconURL: 'SV_ANN.svg',
        },
      ],
      Content: WrappedCustomBarChart,
      dataSource: 'card1Data',
    },
  ],
  layouts: [
    {
      breakpoint: 'lg',
      layout: [
        {
          i: 'a', w: 8, h: 6,
        },
        {
          i: 'b', w: 2, h: 2,
        },
        {
          i: 'c', w: 2, h: 4,
        },
        {
          i: 'd', w: 2, h: 2,
        },
        {
          i: 'e', w: 4, h: 2,
        },
        {
          i: 'f', w: 10, h: 2,
        },
        {
          i: 'g', w: 2, h: 2,
        },
      ],
    },
    {
      breakpoint: 'sm',
      layout: [
        {
          i: 'a', w: 8, h: 6,
        },
        {
          i: 'b', w: 8, h: 2,
        },
        {
          i: 'c', w: 8, h: 4,
        },
        {
          i: 'd', w: 8, h: 2,
        },
        {
          i: 'e', w: 8, h: 2,
        },
        {
          i: 'f', w: 8, h: 2,
        },
        {
          i: 'g', w: 8, h: 2,
        },
      ],
    },
  ],
};

export default cardLayoutProperties;
