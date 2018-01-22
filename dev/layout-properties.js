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
        defaultView: "defaultView",
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
        layouts: {
          defaultView:
            {
              iframeCardAA: {
                lg: {w: 6, h: 2,},
                md: {w: 6, h: 2,},
                sm: {w: 6, h: 2},
              },
              mattanCard: {
                lg: {w: 6, h: 2,},
                md: {w: 4, h: 2,},
                sm: {w: 2, h: 2},
              },
              mattanCardb: {
                lg: {w: 6, h: 2, minW: 2, maxW: 8,},
                md: {w: 2, h: 2, minW: 2, maxW: 8,},
                sm: {w: 2, h: 2},
              },
              oobIFrameCard: {
                lg: {w: 6, h: 4,},
                md: {w: 5, h: 4,},
                sm: {w: 8, h: 4},
              },
              customBarChartCard: {
                lg: {w: 6, h: 2,},
                md: {w: 5, h: 2,},
                sm: {w: 8, h: 2},
              },
            },
          lironView:
            {
              customBarChartCard: {
                lg: {w: 6, h: 2,},
                md: {w: 5, h: 2,},
                sm: {w: 8, h: 2},
              },
              oobIFrameCard: {
                lg: {w: 6, h: 4,},
                md: {w: 5, h: 4,},
                sm: {w: 8, h: 4},
              },
              mattanCardb: {
                lg: {w: 6, h: 2, minW: 2, maxW: 8,},
                md: {w: 2, h: 2, minW: 2, maxW: 8,},
                sm: {w: 2, h: 2},
              },
            },
        },
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
                iconURL: 'trashbin.svg',
                iconURLHover: 'trashbin_hover.svg',
              },
              {
                id: 'MulBy2',
                displayName: 'Multiply by 2',
                iconURL: 'refresh.svg',
                iconURLHover: 'refresh_hover.svg',
              },
              {
                id: 'FromConfig',
                displayName: 'From Config',
                iconURL: 'see_all.svg',
                iconURLHover: 'see_all_hover.svg',
                onClick(actionId) { console.log(`Action Id: ${actionId} Card Id: ${this.props.cardId}`); },
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
