import * as ItemsOrganizer from './ItemsOrganizer';

const breakpoints = ['lg', 'md', 'sm'];
const breakpointsConfig = [
  {
    id: 'lg',
    col: 12,
    height: 2,
    width: 1400,
  },
  {
    id: 'md',
    col: 8,
    height: 2,
    width: 1200,
  },
  {
    id: 'sm',
    col: 6,
    height: 2,
    width: 1024,
  },
];

describe('examines the output of extractByOrderAndPopulateAllBreakpoints when...', () => {
  it('configuration exists for all three breakpoints', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['a', 'b', 'c'],
        cards: {
          a: {
            lg: { w: 6, h: 2 },
            md: { w: 4, h: 2 },
            sm: { w: 2, h: 2 },
          },
          b: {
            lg: { w: 12, h: 2 },
            md: { w: 6, h: 2 },
            sm: { w: 4, h: 2 },
          },
          c: {
            lg: { w: 12, h: 2 },
            md: { w: 6, h: 2 },
            sm: { w: 4, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'a', w: 6,
        },
        {
          h: 2, i: 'b', w: 12,
        },
        {
          h: 2, i: 'c', w: 12,
        },
      ],
      md: [
        {
          h: 2, i: 'a', w: 4,
        },
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'c', w: 6,
        },
      ],
      sm: [
        {
          h: 2, i: 'a', w: 2,
        },
        {
          h: 2, i: 'b', w: 4,
        },
        {
          h: 2, i: 'c', w: 4,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('configuration exists for all three breakpoints - different order', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'c', 'a'],
        cards: {
          a: {
            lg: { w: 6, h: 2 },
            md: { w: 4, h: 2 },
            sm: { w: 2, h: 2 },
          },
          b: {
            sm: { w: 4, h: 2 },
            lg: { w: 12, h: 2 },
            md: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
            lg: { w: 12, h: 2 },
            sm: { w: 4, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'b', w: 12,
        },
        {
          h: 2, i: 'c', w: 12,
        },
        {
          h: 2, i: 'a', w: 6,
        },
      ],
      md: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'c', w: 6,
        },
        {
          h: 2, i: 'a', w: 4,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 4,
        },
        {
          h: 2, i: 'c', w: 4,
        },
        {
          h: 2, i: 'a', w: 2,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('order includes only a subset of the cards', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'a'],
        cards: {
          a: {
            lg: { w: 6, h: 2 },
            md: { w: 4, h: 2 },
            sm: { w: 2, h: 2 },
          },
          b: {
            sm: { w: 4, h: 2 },
            lg: { w: 12, h: 2 },
            md: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
            lg: { w: 12, h: 2 },
            sm: { w: 4, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'b', w: 12,
        },
        {
          h: 2, i: 'a', w: 6,
        },
      ],
      md: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'a', w: 4,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 4,
        },
        {
          h: 2, i: 'a', w: 2,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('order includes non-unique ids, expect an error', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'a', 'b'],
        cards: {
          a: {
            lg: { w: 6, h: 2 },
            md: { w: 4, h: 2 },
            sm: { w: 2, h: 2 },
          },
          b: {
            sm: { w: 4, h: 2 },
            lg: { w: 12, h: 2 },
            md: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
            lg: { w: 12, h: 2 },
            sm: { w: 4, h: 2 },
          },
        },
      },
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(null);
  });

  it('when only lg configuration exists', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['a', 'c', 'b'],
        cards: {
          a: {
            lg: { w: 6, h: 2 },
          },
          b: {
            lg: { w: 12, h: 2 },
          },
          c: {
            lg: { w: 12, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'a', w: 6,
        },
        {
          h: 2, i: 'c', w: 12,
        },
        {
          h: 2, i: 'b', w: 12,
        },
      ],
      md: [
        {
          h: 2, i: 'a', w: 8,
        },
        {
          h: 2, i: 'c', w: 8,
        },
        {
          h: 2, i: 'b', w: 8,
        },
      ],
      sm: [
        {
          h: 2, i: 'a', w: 6,
        },
        {
          h: 2, i: 'c', w: 6,
        },
        {
          h: 2, i: 'b', w: 6,
        },
      ],
    };
    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('when not all cards have all breakpoint configurations', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'a'],
        cards: {
          a: {
            md: { w: 4, h: 2 },
            sm: { w: 2, h: 2 },
          },
          b: {
            sm: { w: 4, h: 2 },
            lg: { w: 10, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
            lg: { w: 12, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'b', w: 10,
        },
        {
          h: 2, i: 'a', w: 12,
        },
      ],
      md: [
        {
          h: 2, i: 'b', w: 8,
        },
        {
          h: 2, i: 'a', w: 4,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 4,
        },
        {
          h: 2, i: 'a', w: 2,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('when only md configuration exists', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'a'],
        cards: {
          a: {
            md: { w: 4, h: 2 },
          },
          b: {
            md: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'b', w: 12,
        },
        {
          h: 2, i: 'a', w: 12,
        },
      ],
      md: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'a', w: 4,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'a', w: 6,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });

  it('only two breakpoints are configured IN THE APP', () => {
    const altBreakpoints = ['md', 'sm'];
    const altBreakpointsConfig = [
      {
        id: 'md',
        col: 8,
        height: 2,
        width: 1200,
      },
      {
        id: 'sm',
        col: 6,
        height: 2,
        width: 1024,
      },
    ];

    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'a'],
        cards: {
          a: {
            lg: { w: 4, h: 12 },
            md: { w: 4, h: 2 },
          },
          b: {
            sm: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
          },
        },
      },
    };

    const expected = {
      md: [
        {
          h: 2, i: 'b', w: 8,
        },
        {
          h: 2, i: 'a', w: 4,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'a', w: 6,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, altBreakpoints, altBreakpointsConfig)).toEqual(expected);
  });

  it('if there are ids in the cards order array not in the cards config, create default config for it', () => {
    const cardsConfiguration = {
      defaultView: {
        cardsOrder: ['b', 'd'],
        cards: {
          a: {
            md: { w: 4, h: 2 },
          },
          b: {
            md: { w: 6, h: 2 },
          },
          c: {
            md: { w: 6, h: 2 },
          },
        },
      },
    };

    const expected = {
      lg: [
        {
          h: 2, i: 'b', w: 12,
        },
        {
          h: 2, i: 'd', w: 12,
        },
      ],
      md: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'd', w: 8,
        },
      ],
      sm: [
        {
          h: 2, i: 'b', w: 6,
        },
        {
          h: 2, i: 'd', w: 6,
        },
      ],
    };

    expect(ItemsOrganizer.extractByOrderAndPopulateAllBreakpoints(cardsConfiguration.defaultView.cards, cardsConfiguration.defaultView.cardsOrder, breakpoints, breakpointsConfig)).toEqual(expected);
  });
});
