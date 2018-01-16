import cardLayoutProperties from '../configurableUI/layout-properties';
import DataComponent from '../components/DataComponent';
import CardsLayoutManager from '../../src/cardsLayoutManager/CardsLayoutManager';
import Card from '../../src/cardsLayoutManager/Card';
import { coreLayoutConfiguration } from './coreLayout';

export const getProjectOverviewConfiguration = ({ data }) => {
  return {
      type: CardsLayoutManager,
        props: {
        config: getLayoutConfiguration(),
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
          props: {},
          children: {
            mattanCardContent: {
              type: DataComponent,
              props: { data: data },
            },
          },
        }
      },
  }
}

const getLayoutConfiguration = () => {
  return coreLayoutConfiguration; // merge to come here?
}