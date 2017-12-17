const cardLayoutProperties = [
  {
    i: 'a',
    title: 'Box A Title',
    actions: [],
    content: 'A',
    layout: {
      i: 'a', x: 0, y: 0, w: 2, h: 2,
    },
  },
  {
    i: 'b',
    content: 'B',
    title: 'Test should not display',
    displayHeader: false,
    layout: {
      i: 'b', x: 2, y: 0, w: 8, h: 2, minW: 2, maxW: 8,
    },
  },
  {
    i: 'c',
    title: 'Box C Title',
    actions: ['test1', 'test2'],
    content: 'C',
    layout: {
      i: 'c', x: 10, y: 0, w: 2, h: 2,
    },
  },
];

export default cardLayoutProperties;
