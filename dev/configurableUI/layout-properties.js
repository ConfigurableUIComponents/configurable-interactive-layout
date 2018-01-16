// import CustomBarChart from './CustomBarChart';
// import WrappedCustomBarChart from './WrappedCustomBarChart';
// import DICard from './DataIntegrityCard';
import Iframe from 'react-iframe';
import IframeCard from '../../src/InteractiveIframe/iframeCard';
import ProjectOverviewApp from '../TestApp2';
// import ConfigurableCardsLayoutManager
// from '../src/cardsLayoutManager/ConfigurableCardsLayoutManager';
import CardsLayoutManager from '../../src/cardsLayoutManager/CardsLayoutManager';
import WrappedCustomBarChart from '../components/WrappedCustomBarChart';
import SprintReview from '../components/SprintReview';
import Card from '../../src/cardsLayoutManager/Card';

const cardLayoutProperties = {
  type: ProjectOverviewApp,
  children: {
    responsiveLayout: {
      type: CardsLayoutManager,
      props: {
        config: {
          draggable: true,
          resizable: false,
          rowHeight: 100,
          cardMargin: [20, 20],
          cardPadding: [20, 20],
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
                i: 'iframeCardAA', w: 6, h: 2,
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
                i: 'iframeCardAA', w: 4, h: 2,
              },
              {
                i: 'mattanCard', w: 2, h: 2,
              },
              {
                i: 'mattanCardb', w: 2, h: 2, minW: 2, maxW: 8,
              },
              {
                i: 'oobIFrameCard', w: 5, h: 4,
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
        mattanCard: {
          type: Card,
          props: {
          },
          children: {
            mattanCardContent: {
              type: SprintReview,
            },
          },
        }
      },
    },
  },
};
export default cardLayoutProperties;
