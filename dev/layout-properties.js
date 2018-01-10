// import CustomBarChart from './CustomBarChart';
// import WrappedCustomBarChart from './WrappedCustomBarChart';
// import DICard from './DataIntegrityCard';
import Iframe from 'react-iframe';
import IframeCard from '../src/InteractiveIframe/iframeCard';
import ProjectOverviewApp from './TestApp2';
// import ConfigurableCardsLayoutManager
// from '../src/cardsLayoutManager/ConfigurableCardsLayoutManager';
import CardsLayoutManager from '../src/cardsLayoutManager/CardsLayoutManager';
import WrappedCustomBarChart from './WrappedCustomBarChart';
import SprintReview from './SprintReview';
import Card from '../src/cardsLayoutManager/Card';

const cardLayoutProperties = {
  type: ProjectOverviewApp,
  children: {
    responsiveLayout: {
      type: CardsLayoutManager,
      props: {
        config: {
          draggable: false,
          resizable: false,
          rowHeight: 100,
          cardMargin: [10, 10],
          cardPadding: [10, 10],
          breakpoints: [
            {
              id: 'lg',
              col: 12,
              width: 1400,
            },
            {
              id: 'md',
              col: 10,
              width: 1200,
            },
            {
              id: 'sm',
              col: 8,
              width: 1024,
            },
          ],
        },
        layouts: [
          {
            breakpoint: 'lg',
            layout: [
              {
                i: 'iframeCardAA', w: 6, h: 4,
              },
              {
                i: 'mattanCard', w: 6, h: 2,
              },
              {
                i: 'mattanCardb', w: 6, h: 2, minW: 2, maxW: 8,
              },
              {
                i: 'oobIFrameCard', w: 6, h: 4,
              },
              {
                i: 'customBarChartCard', w: 6, h: 2,
              },
              {
                i: 'e', w: 6, h: 2,
              },
            ],
          },
          {
            breakpoint: 'md',
            layout: [
              {
                i: 'iframeCardAA', w: 6, h: 4,
              },
              {
                i: 'mattanCard', w: 2, h: 4,
              },
              {
                i: 'mattanCardb', w: 2, h: 4, minW: 2, maxW: 8,
              },
              {
                i: 'oobIFrameCard', w: 5, h: 2,
              },
              {
                i: 'customBarChartCard', w: 5, h: 2,
              },
              {
                i: 'e', w: 10, h: 2,
              },
            ],
          },
          {
            breakpoint: 'sm',
            layout: [
              {
                i: 'iframeCardAA', w: 6, h: 2,
              },
              {
                i: 'mattanCard', w: 2, h: 2,
              },
              {
                i: 'mattanCardb', w: 8, h: 2,
              },
              {
                i: 'oobIFrameCard', w: 8, h: 4,
              },
              {
                i: 'customBarChartCard', w: 8, h: 2,
              },
              {
                i: 'e', w: 8, h: 2,
              },
            ],
          },
        ],
      },
      children: {
        iframeCardAA: {
          type: IframeCard,
          props: {
            title: 'iframe card example',
            url: 'myIframe.html',
            eventIds: ['a', 'b', 'c'],
          },
        },
        mattanCard: {
          type: Card,
          props: {
            // title: 'Mattan',
          },
          children: {
            mattanCardContent: {
              type: SprintReview,
            },
          },
        },
        mattanCardb: {
          type: Card,
          props: {
            title: 'Mattan With Title',
          },
          children: {
            mattanCardContentb: {
              type: SprintReview,
            },
          },
        },
        oobIFrameCard: {
          type: Card,
          props: {
            title: 'IFrame Card',
            actions: [],
          },
          children: {
            wikipediaSite: {
              type: Iframe,
              props: {
                url: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
                height: '400px',
                width: '600px',
              },
            },
          },
        },
        customBarChartCard: {
          type: Card,
          props: {
            title: 'Steve With Actions',
            actions: [
              {
                id: 'DivBy2',
                displayName: 'Divide by 2',
                iconURL: 'SV_ANN.svg',
              },
              {
                id: 'MulBy2',
                displayName: 'Multiply by 2',
              },
              {
                id: 'FromConfig',
                displayName: 'From Config',
                iconURL: 'SV_ANN.svg',
                onClick(actionId) {
                  console.log(`Action Id: ${actionId} Card Id: ${this.props.configId}`);
                },
              },
            ],
          },
          children: {
            customBarChartContent: {
              type: WrappedCustomBarChart,
              props: {
                myProps: 1,
              },
            },
          },
        },
      },
    },
  },
};
export default cardLayoutProperties;
