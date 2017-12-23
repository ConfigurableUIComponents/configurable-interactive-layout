function getMatchingEntry(id, layout) {
  return layout.filter(element => element.i === id);
}

function compressLayout(sortedLayoutIds, layout, layoutMaxCol) {
  const compressedLayout = [];
  let xPos = 0;
  let yPos = 0;
  for (let i = 0; i < sortedLayoutIds.length; i += 1) {
    const match = getMatchingEntry(sortedLayoutIds[i], layout)[0];
    console.log(`Found Match for ${sortedLayoutIds[i]}: ${JSON.stringify(match)}`);

    // ensure width of element never exceeds max col width
    if (match.w > layoutMaxCol) {
      match.w = layoutMaxCol;
    }

    // ensure there is space in current row
    if (xPos + match.w > layoutMaxCol) {
      yPos += match.h;
      xPos = 0;
    }

    // reset position values
    match.x = xPos;
    match.y = yPos;
    compressedLayout.push(match);
    console.log(`Compressed match: ${JSON.stringify(match)}`);

    // update x according to width
    xPos += match.w;
  }
  return compressedLayout;
}

export default function maintainCardSizeOnLayoutChange(currentLayout, allLayouts, colMap) {
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
  console.log(sortedIds);

  const updatedLayouts = {};
  const colTypes = Object.keys(colMap);
  for (let i = 0; i < colTypes.length; i += 1) {
    console.log(`Compressing for: ${colTypes[i]}`);
    updatedLayouts[colTypes[i]] =
      compressLayout(sortedIds, allLayouts[colTypes[i]], colMap[colTypes[i]]);
  }
  console.log(updatedLayouts);
  return updatedLayouts;
}
