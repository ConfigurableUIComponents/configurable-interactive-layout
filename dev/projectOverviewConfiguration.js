import Iframe from 'react-iframe';
import SprintReview from './SprintReview';
import ProjectOverviewApp from './TestApp2';
import WrappedCustomBarChart from './WrappedCustomBarChart';
import Card from './../src/cardsLayoutManager/Card';
import ConfigurableCardsLayoutManager from '../src/cardsLayoutManager/ConfigurableCardsLayoutManager';

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
          ynetCard: {
            breakpoints: {
              lg: { width: 4, height: 5 },
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
        ynetCard: {
          type: Card,
          props: {
            title: 'Ynet card',
            actions: [],
          },
          children: {
            googleSite: {
              type: Iframe,
              props: {
                url: 'http://www.ynet.co.il',
                width: '450px',
                height: '450px',
                className: 'googleSiteClass',
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
