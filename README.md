![logo](https://avatars1.githubusercontent.com/u/20083774?s=460&v=4)
___________
# Ng Smart Tabs
###### created by  Andrew Wormald
__________

### Installation:
##### Step 1:
```bash
npm install ng-smart-tabs
```

##### Step 2:
Ensure you are using routing as this directive works hand in hand with Agnular's Router.
```bash
import { NgSmartTabsModule } from 'ng-smart-tabs';

@NgModule({
  imports: [
    NgSmartTabsModule,
  ],
})
```

##### Step 3:
```bash
<a ng-smart-tab>{{YOUR_TEXT}}</a>
```

| Attribute        | Default      | Tpe  |
| :------------- | :----------:| :-----:|
| isFollowLineInvisible     | false | boolean |
| lineColor | #EF476F | string |
| activeOnUrlMatch | null | string |
| underlineSidePadding | 0 | number |
| horizontalChangeSpeed | '1' | string |
| verticalChangeSpeed | '1' | string |
| opacityChangeSpeed | '1.25' | string |
| widthChangeSpeed | '0.35s' | string |


### For example:
```bash
<a ng-smart-tab
   activeOnUrlMatch="/path">{{YOUR_TEXT}}</a>
```

```bash
<a ng-smart-tab
   opacityChangeSpeed="2.35">{{YOUR_TEXT}}</a>
```

```bash
<a ng-smart-tab
   lineColor="#eee">{{YOUR_TEXT}}</a>
```
___________