
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



