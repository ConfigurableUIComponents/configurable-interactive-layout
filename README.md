# Configurable-Interactive-Layout

This library provides a set of components to create a Layout based on Amdocs Open Network Style Guide.
The React components exposed in this library are:

  - Layout
  - Card


### Installation
> npm install configurable-interactive-layout --save

In your application
> import {CardsLayoutManager, Card} from 'configurable-interactive-layout';

```javascript
render() {

        return  (
            <CardsLayoutManager layoutConfiguration={...} cardsConfiguration={...} >
                <Card configId="card1">
                    <div> My Content </div>
                <Card>
                <Card configId="card2">
                    <div> My Contennt 2 </div>
                </Card>
            </CardsLayoutManager>
        }
    }
```

### Layout

  - A React component with an API wrapping react-grid-layout
  - Renders any number of child components and, according to the configuration props passed, organized them, adds styles and support for drag and drop.

    #### layoutConfiguration [optional]
    Override default layout configurations
    for example, this configuration will enable dragging and dropping of cards
```javascript
  const layoutConfig = {draggable: true};          
  <CardsLayoutManager layoutConfiguration={layoutConfig} cardsConfiguration={...} >
                
```
```javascript
  defult:
  {
    draggable: false,
    resizable: false,
    rowHeight: 100,
    cardMargin: [20, 20],
    cardPadding: [20, 20],
    breakpoints: [
      {
        id: 'lg',
        col: 12,
        width: 1280,
      },
      {
        id: 'md',
        col: 8,
        width: 960,
      },
      {
        id: 'sm',
        col: 6,
        width: 1,
      },
    ],
  };
```
   #### cardsConfiguration  
   Configure card layout.
   Different configurations are expected according to the value of 
   ```javascript
   layoutConfiguration.draggable = true/false
   ```
   
   ```javascript
   // Draggable Layout
   {
       cards: {
         card1: {
           lg: {      // for each screen breakpoint
             "w": 6,  // the number of columns
             "h": 2,  // the number of rows
             "x": 0,  // the inital horizontal position
             "y": 0   // the inital vertical position
           },
           md: {
             "w": 4,
             "h": 2,
             "x": 0,
             "y": 0
           },
           sm: {
             "w": 2,
             "h": 2,
             "x": 0,
             "y": 0
           },
         },
         // all other cards
       }
   }
  ```
  
 ```javascript
 // Pre-Defined Layout (drag disabled)
 {
     {
         cardsOrder: ['card1', ... all visible cards], // order will be optimized from left to right, top to bottom
         cards: {
           card1: {
             lg: {w: 6, h: 2}, // the number of columns and rows of each card
             md: {w: 4, h: 2},
             sm: {w: 2, h: 2},
           },
           // all other cards
          }
     }
 }
```
 
   ```javascript
   onLayoutChange (function)
   - A callback to be called after a user drops a draggable card
   Params: updatedCards: Array of the updated cards configuration
   ```
     

### Card
  - A React component used to render any content and, according to the configuration props passed, can have a title and actions menu
  - Cards are typically used as the child components of the Layout
  
  ##### configId [string]
   ```javascript
  A unique identifier of the card; should match the relevant recored in the cardsConfiguration layout prop
  ```
  
  ##### title [optional][string]
  ```javascript
  The title of the card
  ```

  ##### actions [optional][object]
  ```javascript
  Actions to present in the actions menu
  actions={
      'action1' : {    
        displayName: 'action1 tooltip', // the tooltip text
        iconURL: 'icons/trashbin.svg',  // a path to the svg
        iconURLHover: 'icons/trashbin_hover.svg', // a path to the on hover svg
        onClick: () => { ... }, // callback function to handle a click on the action 
      }
    }
  ```



