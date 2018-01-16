import Iframe from 'react-iframe';
import SprintReview from '../components/SprintReview';
import ProjectOverviewApp from '../TestApp2';
import WrappedCustomBarChart from '../components/WrappedCustomBarChart';
import Card from '../../src/cardsLayoutManager/Card';
// import IframeCard from '../InteractiveIframe/iframeCard';
import ConfigurableCardsLayoutManager from '../../src/cardsLayoutManager/ConfigurableCardsLayoutManager';

const projectOverviewConfiguration = {
  type: ProjectOverviewApp,
  children: {
    responsiveLayout: {
      type: ConfigurableCardsLayoutManager,
      props: {
        defaultView: {
          mattanCard: {
            breakpoints: {
              lg: { width: 2, height: 2 },
              md: { width: 2, height: 2 },
            },
            column: 6,
            row: 0,
          },
          mattanCardb: {
            breakpoints: {
              lg: { width: 2, height: 2 },
              md: { width: 2, height: 2 },
            },
            column: 8,
            row: 0,
          },
          oobIFrameCard: {
            breakpoints: {
              lg: { width: 4, height: 4 },
              md: { width: 2, height: 2 },
            },
            column: 0,
            row: 2,
          },
          customBarChartCard: {
            breakpoints: {
              lg: { width: 6, height: 2 },
              md: { width: 4, height: 2 },
            },
            column: 0,
            row: 0,
          },
        },
      },
      children: {
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

export default projectOverviewConfiguration;
