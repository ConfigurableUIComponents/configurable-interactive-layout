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

    console.log(`Space available in column ${xPos} since maxValue value is ${existingOffsetYValue} (which is smaller than ${yPos})`);
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
            console.log(`Space found at (${col}, ${yPos}) for ${JSON.stringify(match)}`);
            break;
          } else if (col + 1 + match.w > layoutMaxCol) {
            // no more room in this row for this component, break
            // so can move to the next row
            console.log(`No space found in current row (${yPos}), moving to next row`);
            break;
          }
          console.log(`No space found at (${col}, ${yPos}) for ${JSON.stringify(match)}`);
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
      console.log(`Blocking out column ${xPos + j} down to ${match.h + yPos}`);
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

  console.log(`Compressed Layout (Max Col: ${layoutMaxCol}): ${JSON.stringify(orderedLayout)}`);
  return orderedLayout;
}

export default function maintainCardOrderAcrossBreakpoints(currentLayout, allLayouts, colMap) {
  console.log('Calculating New Layouts');
  console.log(`Current Layout: ${JSON.stringify(currentLayout)}`);
  console.log(`Columns Per Breakpoint: ${JSON.stringify(colMap)}`);
  console.log(`All Layouts: ${JSON.stringify(allLayouts)}`);

  // determine order of current layout (id order from top-left to bottom-right)
  const sortedLayout = currentLayout.sort((layout1, layout2) => {
    if (layout1.y === layout2.y) {
      return layout1.x > layout2.x;
    }
    return layout1.y > layout2.y;
  });
  const sortedIds = sortedLayout.map(layout => layout.i);
  console.log(`Card id order by placement (pre-reordering): ${sortedIds}`);

  const updatedLayouts = {};
  const colTypes = Object.keys(colMap);
  for (let i = 0; i < colTypes.length; i += 1) {
    console.log(`Ordering for: ${colTypes[i]}`);
    updatedLayouts[colTypes[i]] =
      layoutComponents(sortedIds, allLayouts[colTypes[i]], colMap[colTypes[i]]);
  }
  console.log('All Ordered Layouts:');
  console.log(updatedLayouts);
  return updatedLayouts;
}
