// import Iframe from 'react-iframe';
import SprintReview from './SprintReview';
import Card from './../src/cardsLayoutManager/Card';
import ConfigurableCardsLayoutManager from '../src/cardsLayoutManager/ConfigurableCardsLayoutManager';

const projectOverviewConfiguration = {

  type: ConfigurableCardsLayoutManager,
  props: {
    defaultView: {
      // googleCard: {
      //   x: 0, y: 0, w: 6, h: 2,
      // },
      // customBarChart: {
      //   x: 6, y: 0, w: 6, h: 2, minW: 2, maxW: 8,
      // },
      // googleInteractiveCard: {
      //   x: 0, y: 2, w: 6, h: 4,
      // },
      mattanCard: {
        breakpoints: {
          lg: { width: 6, height: 2 },
          md: { width: 4, height: 2 },
        },
        column: 2,
        row: 2,
      },
      mattanCardb: {
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
        title: 'Mattan',
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
        title: 'Mattanb',
      },
      children: {
        mattanCardContentb: {
          type: SprintReview,
        },
      },
    },
    // googleCard: {
    //   type: Card,
    //   props: {
    //     title: 'Google search card',
    //     actions: [],
    //   },
    //   children: {
    //     googleSite: {
    //       type: Iframe,
    //       props: {
    //         url: 'www.google.com',
    //         width: '450px',
    //         height: '450px',
    //         className: 'googleSiteClass',
    //       },
    //     },
    //   },
    // },
    // customBarChart: {
    //   type: Card,
    //   props: {
    //     title: 'Expense Card',
    //     actions: [],
    //   },
    //   children: {
    //     expenseBarChart: {
    //       type: WrappedCustomBarChart,
    //       props: {
    //         myProps: 1,
    //       },
    //     },
    //   },
    // },
  },
};

export default projectOverviewConfiguration;
