import uniq from 'lodash/uniq';
import cloneDeep from 'lodash/cloneDeep';

function getMatchingEntry(id, layout) {
  return layout.filter(element => element.i === id);
}

function spaceAvailable(width, xPos, yPos, existingLayout) {
  let available = true;
  for (let i = 0; i < width; i += 1) {
    const xOffset = xPos + i;
    const existingOffsetYValue = existingLayout[xOffset];

    if (existingOffsetYValue && existingOffsetYValue > yPos) {
      // there is already something in this location
      available = false;
      break;
    }
  }
  return available;
}

function layoutComponents(sortedLayoutIds, layout, layoutMaxCol) {
  const orderedLayout = [];
  const bottomComponents = [];
  let xPos = 0;
  let yPos = 0;

  for (let i = 0; i < sortedLayoutIds.length; i += 1) {
    const match = getMatchingEntry(sortedLayoutIds[i], layout)[0];

    // ensure width of element never exceeds max col width
    if (match.w > layoutMaxCol) {
      match.w = layoutMaxCol;
    }
    // xPos = match.x || xPos;
    // console.log('layoutMaxCol', layoutMaxCol);
    // console.log('match.x, xPos', match.x, xPos);
    // find next available space for component
    let spaceFound = false;
    while (!spaceFound) {
      if (xPos + match.w <= layoutMaxCol) {
        // there is space for this component in the current row
        for (let col = xPos; col < layoutMaxCol; col += 1) {
          if (spaceAvailable(match.w, col, yPos, bottomComponents)) {
            // there's space available, set the xPos, update
            // 'spaceFound' so can add the component in the current
            // location
            xPos = col;
            spaceFound = true;
            break;
          } else if (col + 1 + match.w > layoutMaxCol) {
            // no more room in this row for this component, break
            // so can move to the next row
            break;
          }
          // No space found at (${col}, ${yPos}) for match
        }
      }

      if (!spaceFound) {
        // prepare to check next row
        yPos += 1;
        xPos = 0;
      }
    }

    // update the list of bottom components
    for (let j = 0; j < match.w; j += 1) {
      // console.log(`Blocking out column ${xPos + j} down to ${match.h + yPos}`);
      bottomComponents[xPos + j] = match.h + yPos;
    }

    // set position values and add the component to the layout
    match.x = xPos;
    match.y = yPos;
    orderedLayout.push(match);

    // update xPos to be at the end of the newly added component so
    // next component can be added right next to this one
    if (xPos + match.w >= layoutMaxCol) {
      // no more room in this row, set current location to be start of next row.
      // TODO - do we need this case, or will the for loop (inside while loop)
      // take care of moving to next row?
      xPos = 0;
      yPos += 1;
    } else {
      xPos += match.w;
    }
  }

  return orderedLayout;
}

export function maintainCardOrderAcrossBreakpoints(currentLayout, allLayouts, colMap) {
  // determine order of current layout (id order from top-left to bottom-right)
  let sortedLayout = currentLayout;
  if (currentLayout[0].y !== undefined) {
    sortedLayout = currentLayout.sort((layout1, layout2) => {
      if (layout1.y === layout2.y) {
        return layout1.x > layout2.x ? 1 : -1;
      }
      return layout1.y > layout2.y ? 1 : -1;
    });
  }
  const sortedIds = sortedLayout.map(layout => layout.i);
  // console.log(`Card id order by placement (pre-reordering): ${sortedIds}`);

  const updatedLayouts = {};
  const colTypes = Object.keys(colMap);
  for (let i = 0; i < colTypes.length; i += 1) {
    // console.log(`Ordering for: ${colTypes[i]}`);
    updatedLayouts[colTypes[i]] = layoutComponents(sortedIds, allLayouts[colTypes[i]], colMap[colTypes[i]]);
  }
  return updatedLayouts;
}

export function buildDefaultBreakpoints(breakpoints) {
  const defaultBreakpoints = {};
  breakpoints.forEach((breakpoint) => {
    defaultBreakpoints[breakpoint.id] = {};
    defaultBreakpoints[breakpoint.id].w = breakpoint.col;
    defaultBreakpoints[breakpoint.id].h = breakpoint.height;
  });

  return defaultBreakpoints;
}

export function buildColMap(breakpoints) {
  const colMap = {};
  breakpoints.forEach((breakpoint) => {
    colMap[breakpoint.id] = breakpoint.col;
  });
  return colMap;
}

export function buildBreakpoints(breakpoints) {
  const breakpointMap = {};
  breakpoints.forEach((breakpoint) => {
    breakpointMap[breakpoint.id] = breakpoint.width;
  });
  return breakpointMap;
}

export function extractByOrderAndPopulateAllBreakpoints(itemsConfig, itemsOrder, breakpoints, breakpointsConfig) {
  const defaultConfig = buildDefaultBreakpoints(breakpointsConfig);
  const layoutList = {};
  // retrieve all configured layouts
  const uniqItems = uniq(itemsOrder);
  if (uniqItems.length !== itemsOrder.length) {
    console.log('there are non-unique values in the cardsOrder array.');
    return null;
  }

  itemsOrder.forEach((cardKey) => {
    breakpoints.forEach((breakpoint) => {
      let currLayout;
      if (itemsConfig) {
        const cardConfig = itemsConfig[cardKey];
        if (cardConfig) {
          currLayout = itemsConfig[cardKey][breakpoint];
        }
      }
      if (!currLayout) {
        currLayout = cloneDeep(defaultConfig[breakpoint]);
      }
      currLayout.i = cardKey;
      if (!layoutList[breakpoint]) {
        layoutList[breakpoint] = [];
      }
      layoutList[breakpoint].push(currLayout);
    });
  });

  return layoutList;
}

export function extractLayout(itemsConfig, itemsOrder, breakpointsConfig) {
  const COL_MAP = buildColMap(breakpointsConfig);
  const breakpoints = Object.keys(COL_MAP);

  const layoutList = extractByOrderAndPopulateAllBreakpoints(itemsConfig, itemsOrder, breakpoints, breakpointsConfig);
  if (!layoutList) {
    return null;
  }
  const largestConfiguredLayout = layoutList[breakpoints[0]];
  const orderedLayouts = maintainCardOrderAcrossBreakpoints(largestConfiguredLayout, layoutList, COL_MAP);
  return orderedLayouts;
}
